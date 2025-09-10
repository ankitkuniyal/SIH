import express from 'express';
import Farmer from '../Models/Farmer.js';
import Farm from '../Models/Farm.js';
import admin from "../firebaseAdmin.js"

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    const {
        firebaseUid,
        name,
        email,
        phone,
        age,
        language,
        experience,
        district,
        state,
        village,
        pincode,
        coordinates,
        landSize,
        landUnit,
        soilType,
        waterSource,
        irrigationType,
        organicPractices,
        fertilizers,
        pesticides,
        primaryCrops,
        secondaryCrops,
        seasonalPattern
    } = req.body;

    // Security & constraint checks
    // if (
    //     !name || typeof name !== 'string' ||
    //     !email || typeof email !== 'string' ||
    //     !phone || typeof phone !== 'string' ||
    //     !district || typeof district !== 'string' ||
    //     !state || typeof state !== 'string' ||
    //     !village || typeof village !== 'string' ||
    //     !pincode || typeof pincode !== 'string' ||
    //     !coordinates ||
    //     typeof coordinates.lat !== 'number' ||
    //     typeof coordinates.lng !== 'number'
    // ) {
    //     return res.status(400).json({ message: `Missing or invalid required fields` });
    // }
    try {
        // Prevent duplicate registration
        const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
    
    const token = authHeader.split('Bearer ')[1];
         const decodedToken = await admin.auth().verifyIdToken(token);
         const firebaseUid = decodedToken.uid;
        console.log(firebaseUid, decodedToken)
        const existingFarmer = await Farmer.findOne({ firebaseUid });
        if (existingFarmer) {
            return res.status(409).json({ message: 'User already registered' });
        }
        
        // Farmer model data
        const farmerData = {
            firebaseUid,
            name,
            email,
            phone,
            age: age ? Number(age) : undefined,
            language: language || '',
            experience: experience || '',
            district,
            state,
            village,
            pincode
        };

        // Create Farmer
        const farmer = await Farmer.create(farmerData);

        // Farm model data
        const farmData = {
            farmer: farmer._id,
            coordinates: {
                lat: coordinates.lat,
                lng: coordinates.lng
            },
            landSize: landSize ? Number(landSize) : undefined,
            landUnit: landUnit || '',
            soilType: soilType || '',
            waterSource: waterSource || '',
            irrigationType: irrigationType || '',
            organicPractices: Boolean(organicPractices),
            fertilizers: Array.isArray(fertilizers) ? fertilizers : [],
            pesticides: Array.isArray(pesticides) ? pesticides : [],
            primaryCrops: Array.isArray(primaryCrops) ? primaryCrops : [],
            secondaryCrops: Array.isArray(secondaryCrops) ? secondaryCrops : [],
            seasonalPattern: seasonalPattern || ''
        };

        // Create Farm
        const farm = await Farm.create(farmData);

        return res.status(201).json({
            message: 'Registration successful',
            farmer: {
                id: farmer._id,
                name: farmer.name,
                email: farmer.email,
                phone: farmer.phone
            },
            farm
        });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

export default router;