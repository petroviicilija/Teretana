import mongoose from "mongoose";

const trainerDataSchema = new mongoose.Schema({
  specialization: {
    type: [String]
  },
  assignedMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  hourlyRate: {
    type: Number,
    required: true
  }
});

export default trainerDataSchema;