// models/Farmer.js
import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: Number,
  language: { type: String, enum: ['ml', 'en', 'hi'], default: 'ml' },
  experience: String,
  district: String,
  state: String,
  village: String,
  pincode: String
}, { timestamps: true });

// Check if model already exists before creating it
const Farmer = mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema);

export default Farmer;
