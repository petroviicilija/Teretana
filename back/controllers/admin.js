import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

async function getAllUsers(req, res){
  const users = await User.find({});
  res.status(StatusCodes.OK).json(users);
}

async function createUser(req, res){
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).send('User is created');
}

export {
  getAllUsers,
  createUser
}