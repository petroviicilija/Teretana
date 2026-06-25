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
  },
  assignedTrainerAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

memberDataSchema.virtual('isActive').get(function () {
  return this.membershipEnd > new Date();
});

export default memberDataSchema;