import mongoose from "mongoose";

const memberDataSchema = new mongoose.Schema({
  membershipStart: {
    type: Date,
    required: true
  },
  membershipEnd: {
    type: Date,
    required: true
  },
  assignedTrainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default memberDataSchema;