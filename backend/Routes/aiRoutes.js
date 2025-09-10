import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// Inbuilt weather function replacing fetchWeatherSnapshot
async function getWeatherForecast(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const {
      hourly = {},
      daily = {},
      latitude,
      longitude
    } = await response.json();

    // Extract only important weather data
    const data = {
      latitude,
      longitude,
      temperature_2m: hourly.temperature_2m,
      min_temperature: daily.temperature_2m_min,
      max_temperature: daily.temperature_2m_max,
      precipitation_sum: daily.precipitation_sum,
      precipitation_hours: daily.precipitation_hours,
      relative_humidity_2m: hourly.relative_humidity_2m,
      soil_temperature_0cm: hourly.soil_temperature_0cm,
      soil_temperature_6cm: hourly.soil_temperature_6cm,
      soil_moisture_0_7cm: hourly.soil_moisture_0_7cm,
      wind_speed_10m: hourly.wind_speed_10m,
      wind_direction_10m: hourly.wind_direction_10m,
      shortwave_radiation: hourly.shortwave_radiation,
      et0_fao_evapotranspiration: hourly.et0_fao_evapotranspiration
    };

    // Debug log
    // console.log('Hourly Forecast:', data.hourly);
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { alert: 'Weather data unavailable—use caution.' };
  }
}

// Optimized retry helper for Gemini API requests using fetch
const retryGeminiRequest = async (data, maxRetries = 3, delay = 1000) => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(data.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.body),
      });
      if (!response.ok) {
        lastError = new Error(`HTTP error! status: ${response.status}`);
        if ((response.status === 500 || response.status === 503) && i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
          continue;
        } else {
          break;
        }
      }
      const json = await response.json();
      return { data: json };
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (2 ** i)));
      } else {
        break;
      }
    }
  }
  throw lastError;
};

// Helper to fetch JSON with fetch and pass headers
const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
  }
  return await response.json();
};

// Simple test GET route for health check
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'AI routes are working!' });
});

// POST /api/gemini - Generate personalized farming advice
router.post('/gemini', async (req, res) => {
  const {text} = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: GEMINI_API_KEY missing' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  let farmer = null, farm = null, recentActivity = null;
  let weatherSnapshot = { alert: 'Weather data unavailable—use caution.' };

  try {
    // 1. Fetch farmer profile
    let profileData = null;
    try {
      const profileUrl = `${req.protocol}://${req.get('host')}/api/profile`;
      const headers = {};
      if (req.headers.authorization) headers['authorization'] = req.headers.authorization;
      if (req.headers.cookie) headers['cookie'] = req.headers.cookie;
      profileData = await fetchJson(profileUrl, { headers });
      console.log('Profile Data:', profileData);
    } catch (err) {
      console.error('Profile fetch error:', err.message);
    }

    if (profileData?.farmer) {
      farmer = profileData.farmer;
      if (Array.isArray(profileData.farms) && profileData.farms.length > 0) {
        farm = profileData.farms[0];
      }
    }

    // 2. Weather snapshot + last activity
    if (farm?.coordinates?.lat && farm?.coordinates?.lng) {
      try {
        [weatherSnapshot, recentActivity] = await Promise.all([
          getWeatherForecast(farm.coordinates.lat, farm.coordinates.lng),
          Activity.findOne({ farmer: farmer.id || farmer._id, farm: farm._id }).sort({ date: -1 }),
        ]);
      } catch (err) {
        console.error('Weather/Activity error:', err.message);
      }
    }
    console.log('Farmer:', farmer);
    console.log('Farm:', farm);
    console.log('Weather Snapshot:', weatherSnapshot);
    console.log('Recent Activity:', recentActivity);
    // 3. Build prompt for Gemini
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    const prompt = `User Query: ${text}

Farmer Profile: ${JSON.stringify(farmer)}
Farm Profile: ${JSON.stringify(farm)}
Weather Snapshot: ${JSON.stringify(weatherSnapshot)}
Recent Activity: ${JSON.stringify(recentActivity)}

You are **Krishi Sakhi**, an agriculture and farming expert who acts as a personal assistant for smallholder farmers. You have deep knowledge of crops, soil, weather, and farming practices. Use the provided farmer profile, farm details, weather conditions, and recent activities to create a **personalized, assistant-style response**.

⚠️ Very Important Rules:
- Never mention or reveal that you have access to the farmer profile, farm data, weather snapshot, or recent activity.
- Always focus on answering the farmer’s query directly. Use profile, farm, weather, and activity **only as hidden background knowledge** to make advice more relevant.
- If the query indicates an activity (e.g., "planted", "sowed", "harvested", "irrigated"), set updateActivityLog=true and rephrase it in third-person, starting with the task and the date "${today}".
- Estimate soil recovery days for sowing/harvesting based on soil type.
- The response should feel like it is coming from a friendly expert giving direct, practical advice.
- Give less importance to primary and secondary crops, and more importance to query, act like a normal human hot constantly having to reply related to agriculture.
- Don't update the activity log based in previous activity log data its just for reference so that you can communicate properly.

Output only JSON in this exact format:

{
  "updateActivityLog": boolean,
  "textToUpdateActivityLog": string,
  "advisory": string,     // exactly 10 words, sharp expert recommendation
  "chatResponse": string  // exactly 100 words, warm assistant-style response focused on the query
}
`;

    // 4. Call Gemini with retry
    const geminiResp = await retryGeminiRequest({
      url,
      body: {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 350 },
      },
    });

    let aiResponseText = geminiResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // 5. Clean output
    aiResponseText = aiResponseText.replace(/```json|```/g, '').trim();

    let aiResponse;
    try {
      aiResponse = JSON.parse(aiResponseText);
    } catch (err) {
      console.error('Failed to parse Gemini response:', aiResponseText);
      return res.status(500).json({ error: 'Invalid AI response', raw: aiResponseText });
    }

    console.log('ID:', farmer.id, farm?._id);
    if (aiResponse.updateActivityLog && aiResponse.textToUpdateActivityLog) {
      try {
        // Save new activity log entry
        await Activity.create({
          farmer: farmer.id,
          farm: farm?._id,
          description: aiResponse.textToUpdateActivityLog,
          weatherSnapshot: weatherSnapshot,
          advisory: aiResponse.advisory
        });
      } catch (activityErr) {
        console.error('Failed to log activity:', activityErr);
        // Optionally, you could continue without failing the main response
      }
    }
    console.log('AI Response:', aiResponse);
    return res.json(aiResponse);

  } catch (error) {
    console.error('Gemini Route Error:', error.message);
    return res.status(500).json({ error: 'Failed to process query' });
  }
});

export default router;
