import express from 'express';
import Activity from '../Models/Activity.js';
import Farmer from '../Models/Farmer.js';
import { verifyFirebaseToken } from '../firebaseAdmin.js';

const router = express.Router();

router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ firebaseUid: req.firebaseUser.uid });
    if (!farmer) return res.status(404).json({ message: 'Farmer profile not found' });

    const { farmId, type, description, media, weatherSnapshot, date } = req.body;
    const activity = new Activity({
      farmer: farmer._id,
      farm: farmId || null,
      type,
      description,
      media: media || [],
      weatherSnapshot: weatherSnapshot || null,
      date: date || new Date()
    });

    await activity.save();
    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ firebaseUid: req.firebaseUser.uid });
    if (!farmer) return res.status(404).json({ message: 'Farmer profile not found' });

    const activities = await Activity.find({ farmer: farmer._id }).sort({ date: -1 }).limit(100);
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
