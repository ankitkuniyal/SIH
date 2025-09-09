import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FarmerSchema = new Schema({
  firebaseUid: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  email: String,
  language: { type: String, enum: ['ml','en','hi'], default: 'ml' },
  location: {
    village: String,
    district: String,
    pincode: String,
    geoCoords: { lat: Number, long: Number }
  },
  educationLevel: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model('Farmer', FarmerSchema);
