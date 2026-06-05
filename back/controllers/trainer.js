import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';

async function updateTrainer(req, res){

}

async function getTrainer(req, res) {
  const { userId } = req.user;
  const user = await User.findById({ _id: userId }).select('-__v');

  if (!user) {
    throw new NotFoundError(`User with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).json(user);
}

export {
  updateTrainer,
  getTrainer
}