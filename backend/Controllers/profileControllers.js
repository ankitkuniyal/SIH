import express from 'express';
import Farmer from '../Models/Farmer.js';
import { verifyFirebaseToken } from '../firebaseAdmin.js';

const router = express.Router();

router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ firebaseUid: req.firebaseUser.uid });
    if (!farmer) return res.status(404).json({ message: 'Profile not found' });
    res.json(farmer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const farmer = await Farmer.findOneAndUpdate(
      { firebaseUid: req.firebaseUser.uid },
      { ...req.body, firebaseUid: req.firebaseUser.uid, updatedAt: new Date() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(farmer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
