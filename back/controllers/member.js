import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

async function getAllTrainers(req, res) {
  const Alltrainers = await User.find({ role: 'trainer' }).select('-__v');
  const trainers = Alltrainers.map((trainer) => ({
    firstName: trainer.firstName,
    lastName: trainer.lastName,
    specialization: trainer.trainerData.specialization,
    hourlyRate: trainer.trainerData.hourlyRate,
    id: trainer._id
  }));

  res.status(StatusCodes.OK).json(trainers);
}

async function getTrainer(req, res) {
  const trainerId = req.params.id;
  const trainer = await User.findById(trainerId).select('-__v');

  if (!trainer) {
    throw new NotFoundError(`Trainer with id:${trainerId} does not exist.`);
  }

  res.status(StatusCodes.OK).json(trainer);
}

async function getMember(req, res) {
  const { userId } = req.user;
  const user = await User.findById(userId).select('-__v').populate(
    'memberData.assignedTrainer',
    'firstName lastName email trainerData.specialization trainerData.hourlyRate'
  );

  if (!user) {
    throw new NotFoundError(`User with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).json(user);
}

async function updateMember(req, res) {
  const { userId } = req.user;
  const { firstName, lastName, email } = req.body;

  const member = await User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    email
  }, {
    returnDocument: 'after',
    runValidators: true
  }).select('-__v');

  if (!member) {
    throw new NotFoundError(`Member with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).json(member);
}

async function assignTrainer(req, res) {
  const { trainerId } = req.body;

  const updatePayload = trainerId === null ?
    { $unset: { 'memberData.assignedTrainer': 1 } }
    : { 'memberData.assignedTrainer': trainerId }

  await User.findByIdAndUpdate(req.user.userId, updatePayload, {
    returnDocument: 'after',
    runValidators: true
  }).select('-__v');

  res.status(StatusCodes.OK).json({ msg: 'Trainer assigned' })
}

export {
  getAllTrainers,
  getTrainer,
  updateMember,
  getMember,
  assignTrainer
}