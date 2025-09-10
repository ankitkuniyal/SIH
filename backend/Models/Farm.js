// models/Farm.js
import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  landSize: { type: Number, required: true },
  landUnit: { type: String, enum: ['acre', 'hectare'], default: 'acre', required: true },
  soilType: { type: String, required: true },
  waterSource: { type: String, required: true },
  irrigationType: { type: String, required: true },
  organicPractices: { type: Boolean, default: false },
  fertilizers: [{ type: String }],
  pesticides: [{ type: String }],
  primaryCrops: [{ type: String }],
  secondaryCrops: [{ type: String }],
  seasonalPattern: { type: String, required: true }
}, { timestamps: true });

// Check if model already exists before creating it
const Farm = mongoose.models.Farm || mongoose.model('Farm', farmSchema);

export default Farm;