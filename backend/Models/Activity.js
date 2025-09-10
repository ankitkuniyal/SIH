import mongoose from 'mongoose';
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'Farmer', required: true },
  farm: { type: Schema.Types.ObjectId, ref: 'Farm' },
  description: String,
  weatherSnapshot: Schema.Types.Mixed,
  advisory: { type: String }
});

// Check if model already exists before creating it
const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

export default Activity;
