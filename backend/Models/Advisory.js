import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const AdvisorySchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'Farmer' },
  farm: { type: Schema.Types.ObjectId, ref: 'Farm' },
  crop: String,
  stage: String,
  weather: Schema.Types.Mixed,
  recommendation: String,
  source: [String],
  deliveryModes: [String],
  status: { type: String, enum: ['Sent','Acknowledged','Ignored'], default: 'Sent' },
  createdAt: { type: Date, default: Date.now }
});

export default model('Advisory', AdvisorySchema);
