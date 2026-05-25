import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

async function getAllUsers(req, res) {

  const { role, search } = req.query;
  const queryObject = {};
  const page = Number(req.query.page) || 1;
  const limit = 10;

  const skip = (page - 1) * limit;

  if (role) {
    queryObject.role = role
  }

  if (search) {
    queryObject.firstName = {
      $regex: search,
      $options: 'i'
    }
  }

  const totalUsers = await User.countDocuments(queryObject);
  const totalPages = Math.ceil(totalUsers / limit);

  const users = await User.find(queryObject).skip(skip).limit(limit);
  res.status(StatusCodes.OK).json({ users, totalPages, currentPage: Number(page) });
}

async function createUser(req, res) {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).send('User is created');
}

export {
  getAllUsers,
  createUser
}