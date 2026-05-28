import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

async function getUser(req, res){
  const userId = req.params.id;
  const user = await User.findById({_id: userId}).select('-__v');

  if(!user){
    throw new NotFoundError(`User with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).json(user);
}

async function deleteUser(req, res){
  const userId = req.params.id;
  const user = await User.findByIdAndDelete({_id: userId});

  if(!user){
    throw new NotFoundError(`User with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).send('User is successfully deleted');
}

async function updateUser(req, res){
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate({_id: userId}, req.body, {
    returnDocument: 'after',
    runValidators: true
  }).select('-__v');

  if(!user){
    throw new NotFoundError(`User with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).json(user);
}

export {
  getUser,
  deleteUser,
  updateUser
}