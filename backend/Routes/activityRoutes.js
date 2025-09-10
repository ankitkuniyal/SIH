import express from 'express';
import Activity from '../models/Activity.js';


const router = express.Router();


import admin from "../firebaseAdmin.js";

router.get('/', async (req, res) => {
  try {
    // Get Firebase token from Authorization header
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return res.status(401).json({ error: 'Authorization token required' });
    // }
    // const token = authHeader.split('Bearer ')[1];

    // // Verify token and get firebaseUid
    // let firebaseUid;
    // try {
    //   const decodedToken = await admin.auth().verifyIdToken(token);
    //   firebaseUid = decodedToken.uid;
    // } catch (err) {
    //   return res.status(401).json({ error: 'Invalid or expired token' });
    // }
    const firebaseUid = "hT3UXjAZ0zN8krYGlQVfCoUz4v03";
    // Find farmer by firebaseUid
    const Farmer = (await import('../models/Farmer.js')).default;
    const farmerDoc = await Farmer.findOne({ firebaseUid });
    if (!farmerDoc) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    // Use farmer.id from the found farmer document
    const activities = await Activity.find({
      farmer: farmerDoc.id,
    }).sort({ date: -1 });

    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error.message);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

export default router;
