import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FarmSchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  landSize: { type: Number, required: true },
  landUnit: { type: String, enum: ['acre', 'hectare', 'cents'], default: 'acre', required: true },
  soilType: { type: String, required: true },
  waterSource: { type: String, required: true },
  irrigationType: { type: String, required: true },
  organicPractices: { type: Boolean, default: false },
  fertilizers: [{ type: String }],
  pesticides: [{ type: String }],
  primaryCrops: [{ type: String }],
  secondaryCrops: [{ type: String }],
  seasonalPattern: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Farm', FarmSchema);
