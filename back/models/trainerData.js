import mongoose from "mongoose";

  //moze i bez assignedMembers

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