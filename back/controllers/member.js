import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { BadRequestError } from '../errors/index.js';

async function getAllTrainers(req, res) {
  const trainers = await User.find({ role: 'trainer' });
  const trainerName = trainers.map((trainer) => ({ firstName: trainer.firstName, lastName: trainer.lastName }));

  res.status(StatusCodes.OK).json({ trainerName });
}

export {
  getAllTrainers
}