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
    type: String
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
        type: Number
      },
      reps: {
        type: Number
      },
      weight: {
        type: Number
      }
    }
  ]
}, { timestamps: true });

export const Training = mongoose.model('Training', trainingPlanSchema)