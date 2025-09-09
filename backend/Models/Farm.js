import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FarmSchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
  landSize: Number,
  landUnit: { type: String, enum: ['acre','hectare'], default: 'acre' },
  soilType: String,
  irrigationMethod: String,
  currentCrops: [String],
  season: String,
  createdAt: { type: Date, default: Date.now }
});

export default model('Farm', FarmSchema);
