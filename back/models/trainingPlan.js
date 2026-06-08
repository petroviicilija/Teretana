import mongoose from "mongoose";

const trainingPlanSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  exercises: [
    {
      name: {
        type: String,
        required: true
      },
      sets: {
        type: Number,
        required: true
      },
      reps: {
        type: Number,
        required: true
      },
      weight: {
        type: Number
      }
    }
  ]
}, { timestamps: true });

export const Training = mongoose.model('Training', trainingPlanSchema)