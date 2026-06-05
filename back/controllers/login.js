import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.js";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password!');
  }

  const user = await User.findOne({ email: email }).select('+password');
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.firstName, role: user.role, gender: user.gender, id: user._id }, token });
}

export {
  login
}