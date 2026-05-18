import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import memberDataSchema from "./memberData.js";
import trainerDataSchema from "./trainerData.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    minlength: [3, 'First name must have at least 3 characters'],
    maxlength: 20
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    minlength: [3, 'Last name must have at least 3 characters'],
    maxlength: 20
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email'
    ],
    unique: true
  },
  password: {
    type: String,
    minlength: [5, 'Password must have at least 5 characters'],
    required: [true, 'Please provide password']
  },
  role: {
    type: String,
    required: true,
    enum: ['member', 'trainer', 'admin'],
    immutable: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  memberData: {
    type: memberDataSchema,
    required: [function () {
      return this.role === 'member';
    }, 'Member data must be provided.']
  },
  trainerData: {
    type: trainerDataSchema,
    required: [function () {
      return this.role === 'trainer';
    }, 'Trainer data must be provided.']
  }
}, { timestamps: true });

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (submitedPassword) {
  const isMatch = await bcrypt.compare(submitedPassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.firstName, email: this.email, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
};

export const User = mongoose.model('User', userSchema);