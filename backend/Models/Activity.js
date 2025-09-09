import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ActivitySchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
  farm: { type: Schema.Types.ObjectId, ref: 'Farm' },
  type: { type: String, enum: ['Sowing','Irrigation','Fertilizer','Pest','Harvest','Other'], required: true },
  description: String,
  media: [String],
  date: { type: Date, default: Date.now },
  weatherSnapshot: Schema.Types.Mixed,
  advisoryLinked: { type: Schema.Types.ObjectId, ref: 'Advisory' }
});

export default model('Activity', ActivitySchema);
