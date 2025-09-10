import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FarmerSchema = new Schema({
  firebaseUid: { type: String, required: true, unique: true }, // Unique identifier from Firebase
  name: String, // Farmer's name
  email: String, // Contact email
  phone: String, // Contact phone number
  age: Number, // Farmer's age
  language: { type: String, enum: ['ml','en','hi'], default: 'ml' }, // Preferred language
  experience: String, // Farming experience level
  district: String, // General location
  state: String, // General location
  village: String, // General location
  pincode: String, // Postal code
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model('Farmer', FarmerSchema);
