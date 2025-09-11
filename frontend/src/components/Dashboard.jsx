import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { Cloud, Droplets, Sun, Wind, Calendar, TrendingUp, AlertTriangle, MessageCircle, ChevronRight, Newspaper, ExternalLink, ChevronDown } from "lucide-react";
import ImageWithFallback from "./figma/ImageWithFallback.jsx";
import { ProfileSetup } from "./ProfileSetup.jsx";
import { useNavigate } from "react-router-dom";

export function Dashboard({ farmerName, onTabChange }) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // News state
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);
  const [selectedNewsLanguage, setSelectedNewsLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Weather state
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // Profile state
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  // Language options for news
  const newsLanguageOptions = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' }
  ];

  // Weather API function
  const getWeatherForecast = async (latitude, longitude) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode&timezone=auto`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return { alert: 'Weather data unavailable—use caution.' };
    }
  };

  // Process weather data for display
  const processWeatherData = (weatherData) => {
    if (weatherData.alert) {
      return { error: weatherData.alert };
    }

    const currentHour = new Date().getHours();
    const hourly = weatherData.hourly;
    
    // Get current weather (closest hour)
    const currentTemp = hourly.temperature_2m[currentHour] || hourly.temperature_2m[0];
    const currentPrecipitation = hourly.precipitation[currentHour] || hourly.precipitation[0];
    const currentWeatherCode = hourly.weathercode[currentHour] || hourly.weathercode[0];
    
    // Convert weather code to condition
    const getWeatherCondition = (code) => {
      if (code === 0) return "Clear sky";
      if (code <= 3) return "Partly cloudy";
      if (code <= 48) return "Foggy";
      if (code <= 67) return "Rainy";
      if (code <= 77) return "Snow";
      if (code <= 82) return "Rain showers";
      if (code <= 86) return "Snow showers";
      if (code <= 99) return "Thunderstorm";
      return "Unknown";
    };

    // Calculate today's total rainfall
    const todayRainfall = hourly.precipitation.slice(0, 24).reduce((sum, val) => sum + (val || 0), 0);

    return {
      temp: Math.round(currentTemp),
      condition: getWeatherCondition(currentWeatherCode),
      humidity: 75, // Open-Meteo doesn't provide humidity in this endpoint
      rainfall: Math.round(todayRainfall * 10) / 10, // Round to 1 decimal
      windSpeed: 12 // Open-Meteo doesn't provide wind speed in this endpoint
    };
  };

  // Fetch profile data first
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        setProfileError(null);
        const response = await fetch('http://localhost:3000/api/profile');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }
        
        const data = await response.json();
        setProfileData(data);
        console.log('Profile data fetched:', data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setProfileError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch weather data using coordinates from profile
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError(null);
        
        // Get coordinates from profile data
        let latitude = 9.9312; // Default Kerala coordinates
        let longitude = 76.2673;
        
        if (profileData?.farms && profileData.farms.length > 0) {
          const farm = profileData.farms[0];
          if (farm.coordinates?.lat && farm.coordinates?.lng) {
            latitude = farm.coordinates.lat;
            longitude = farm.coordinates.lng;
            console.log('Using farm coordinates:', latitude, longitude);
          } else {
            console.log('No farm coordinates found, using default Kerala coordinates');
          }
        } else {
          console.log('No farm data found, using default Kerala coordinates');
        }
        
        const weatherData = await getWeatherForecast(latitude, longitude);
        const processedWeather = processWeatherData(weatherData);
        
        if (processedWeather.error) {
          setWeatherError(processedWeather.error);
        } else {
          setWeather(processedWeather);
        }
      } catch (error) {
        setWeatherError('Failed to fetch weather data');
        console.error('Weather fetch error:', error);
      } finally {
        setWeatherLoading(false);
      }
    };

    // Only fetch weather after profile data is loaded (or failed to load)
    if (!profileLoading) {
      fetchWeather();
    }
  }, [profileData, profileLoading]);

  // Fetch agriculture news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=indian+agriculture+pm+kisan&apiKey=7ecd3f5530104f04b50aca7d85d447c2'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Get only first 3 articles for dashboard
        setNews(data.articles?.slice(0, 3) || []);
        setNewsLoading(false);
      } catch (err) {
        setNewsError('Failed to fetch news');
        setNewsLoading(false);
        console.error('News fetch error:', err);
      }
    };
    fetchNews();
  }, []);

  // Mock recent advice
  const recentAdvice = [
    {
      message: language === 'ml' 
        ? "മഴക്കാലത്തിന് മുന്നോടിയായി നെല്ല് വയലുകൾ തയ്യാറാക്കുക"
        : language === 'hi'
        ? "मानसून से पहले धान के खेत तैयार करें"
        : "Prepare paddy fields before monsoon season",
      timestamp: "2 hours ago",
      confidence: 0.92
    },
    {
      message: language === 'ml'
        ? "ഇലപ്പുള്ളി രോഗം തടയാൻ നീം എണ്ണ തളിക്കുക"
        : language === 'hi' 
        ? "पत्ती के धब्बे की बीमारी को रोकने के लिए नीम का तेल छिड़कें"
        : "Spray neem oil to prevent leaf spot disease",
      timestamp: "Yesterday",
      confidence: 0.88
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pb-20">
      <div className="p-4 space-y-6">
        {/* Welcome Section - Enhanced */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                <span className="text-2xl" onClick={() => navigate('/profile')}>👨‍🌾</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-start">
                  <h2
                  className="text-xl font-bold  cursor-pointer hover:text-green-100 transition-colors text-left"
                  onClick={() => onTabChange && onTabChange('profile')}
                >
                  {t('welcomeBack')}
                </h2>
                </div>
                
                <p className="text-green-100 text-sm text-left">
                  {farmerName || t('farmerName')} • കൃഷി സഹായി
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-white/20">
              <img
                src="https://images.unsplash.com/photo-1625110110679-f0a5659e32b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBmYXJtaW5nJTIwYWdyaWN1bHR1cmUlMjBwYWRkeXxlbnwxfHx8fDE3NTc0MDM3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Kerala farming"
                className="w-full h-32 object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Today's Weather - Enhanced */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Sun className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold">{t('weatherToday')}</span>
                  {profileData?.farmer?.district && (
                    <span className="text-xs text-gray-500">
                      {profileData.farmer.district}, {profileData.farmer.state}
                    </span>
                  )}
                </div>
              </div>
              <Badge className="bg-red-500 text-white">Live</Badge>
            </CardTitle>
          </CardHeader>
                    <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {weatherLoading && (
                <div className="flex items-center justify-center p-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
                  <span className="ml-2 text-sm text-gray-600">
                    {language === 'ml' ? 'കാലാവസ്ഥ ലോഡ് ചെയ്യുന്നു...' : language === 'hi' ? 'मौसम लोड हो रहा है...' : 'Loading weather...'}
                  </span>
                </div>
              )}
              
              {weatherError && (
                <div className="text-center p-4 text-red-600 bg-red-50 rounded-lg">
                  <p className="text-sm">
                    {language === 'ml' ? 'കാലാവസ്ഥ ഡാറ്റ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല' : language === 'hi' ? 'मौसम डेटा लोड नहीं हो सका' : 'Failed to load weather data'}
                  </p>
                  {profileError && (
                    <p className="text-xs text-red-500 mt-1">
                      {language === 'ml' ? 'ഡിഫോൾട്ട് ലൊക്കേഷൻ ഉപയോഗിച്ചു' : language === 'hi' ? 'डिफ़ॉल्ट स्थान का उपयोग किया गया' : 'Using default location'}
                    </p>
                  )}
                </div>
              )}

              {!weatherLoading && !weatherError && weather && (
                <>
                  {/* Main Weather Display */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <Cloud className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">{weather.temp}°</p>
                        <p className="text-sm text-gray-600 font-medium">{weather.condition}</p>
                        {profileData?.farmer?.district && (
                          <p className="text-xs text-gray-500 mt-1">
                            📍 {profileData.farmer.district}, {profileData.farmer.state}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Weather Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Droplets className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Humidity</span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">{weather.humidity}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Wind</span>
                      </div>
                      <p className="text-lg font-bold text-gray-600">{weather.windSpeed} km/h</p>
                    </div>
                  </div>

                  {/* Rainfall Alert */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5" />
                      <p className="font-medium">
                        {language === 'ml' 
                          ? `ഇന്ന് ${weather.rainfall}mm മഴ പ്രതീക്ഷിക്കുന്നു`
                          : language === 'hi'
                          ? `आज ${weather.rainfall}mm बारिश की उम्मीद`
                          : `${weather.rainfall}mm rainfall expected today`}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Agricultural News - Enhanced */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Newspaper className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-800 font-semibold">
                  {language === 'ml' ? "കാർഷിക വാർത്തകൾ" : language === 'hi' ? "कृषि समाचार" : "Agricultural News"}
                </span>
              </CardTitle>
              
              {/* Language Dropdown */}
              <div className="relative">
                {/* <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg border transition-colors"
                >
                  <span className="text-xs">
                    {newsLanguageOptions.find(lang => lang.name === selectedNewsLanguage)?.flag || '🇬🇧'}
                  </span>
                  <span className="font-medium">{selectedNewsLanguage}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
                </button> */}
                
                {showLanguageDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-[120px]">
                    {newsLanguageOptions.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => {
                          setSelectedNewsLanguage(option.name);
                          setShowLanguageDropdown(false);
                          // TODO: Add language change functionality here
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          selectedNewsLanguage === option.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-xs">{option.flag}</span>
                        <span>{option.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {newsLoading && (
              <div className="flex items-center justify-center p-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                <span className="ml-2 text-sm text-gray-600">
                  {language === 'ml' ? 'വാർത്തകൾ ലോഡ് ചെയ്യുന്നു...' : language === 'hi' ? 'समाचार लोड हो रहे हैं...' : 'Loading news...'}
                </span>
              </div>
            )}
            
            {newsError && (
              <div className="text-center p-4 text-red-600 bg-red-50 rounded-lg">
                <p className="text-sm">
                  {language === 'ml' ? 'വാർത്തകൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല' : language === 'hi' ? 'समाचार लोड नहीं हो सके' : 'Failed to load news'}
                </p>
              </div>
            )}

            {!newsLoading && !newsError && news.length === 0 && (
              <div className="text-center p-4 text-gray-600">
                <p className="text-sm">
                  {language === 'ml' ? 'വാർത്തകൾ ലഭ്യമല്ല' : language === 'hi' ? 'कोई समाचार उपलब्ध नहीं' : 'No news available'}
                </p>
              </div>
            )}

            {!newsLoading && !newsError && news.map((article, index) => (
              <div key={index} className="bg-gradient-to-r from-white to-green-50 border border-green-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                      {article.title || 'Untitled'}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {article.description || 'No description available.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {article.source?.name || 'Unknown Source'}
                      </span>
                      <a
                        href={article.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                      >
                        {language === 'ml' ? 'കൂടുതൽ വായിക്കുക' : language === 'hi' ? 'और पढ़ें' : 'Read more'}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  {article.urlToImage && (
                    <img 
                      src={article.urlToImage} 
                      alt="News" 
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
            
            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-md" onClick={() => navigate('/news')}>
              {language === 'ml' ? "കൂടുതൽ കാണുക" : language === 'hi' ? "और देखें" : "View More"}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Advice - Enhanced
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-gray-800 font-semibold">{t('recentAdvice')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {recentAdvice.map((advice, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-r-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium leading-relaxed">{advice.message}</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {advice.timestamp}
                      </p>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {Math.round(advice.confidence * 100)}% confident
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}

        {/* Bottom Spacing */}
        <div className="h-5"></div>
      </div>
    </div>
  );
}