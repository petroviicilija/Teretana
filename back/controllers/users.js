import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js';

async function deleteUser(req, res) {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete({ _id: userId });

  if (!user) {
    throw new NotFoundError(`User with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).send('User is successfully deleted');
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const { userId } = req.user;

  if (!currentPassword || !newPassword) {
    throw new BadRequestError('Please provide passwords.')
  }

  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new NotFoundError(`User with id:${userId} does not exist.`)
  }

  const isPasswordCorrect = await user.checkPassword(currentPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({msg: 'Password changed successfully.'})
}

export {
  deleteUser,
  changePassword
}