import mongoose from "mongoose";

const trainingPlanSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide member']
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  title: {
    type: String,
    required: [true, 'Please provide training title']
  },
  notes: {
    type: String
  },
  exercises: [
    {
      name: {
        type: String,
        required: [true, 'Please provide exercise name']
      },
      sets: {
        type: Number,
        required: [true, 'Please provide sets']
      },
      reps: {
        type: Number,
        required: [true, 'Please provide reps']
      },
      weight: {
        type: Number
      }
    }
  ]
}, { timestamps: true });

export const Training = mongoose.model('Training', trainingPlanSchema)