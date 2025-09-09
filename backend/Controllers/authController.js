import express from 'express';
import Farmer from '../Models/Farmer.js';
import { admin } from '../firebaseAdmin.js';

const router = express.Router();

router.post('/verify', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: 'Missing idToken' });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const farmer = await Farmer.findOne({ firebaseUid: decoded.uid });
    return res.json({ firebaseUser: decoded, profile: farmer || null });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
