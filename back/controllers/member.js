import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { Training } from '../models/trainingPlan.js';
import { BadRequestError, NotFoundError, ForbiddenError } from '../errors/index.js';

async function getAllTrainers(req, res) {
  const Alltrainers = await User.find({ role: 'trainer' }).select('-__v');
  const trainers = Alltrainers.map((trainer) => ({
    firstName: trainer.firstName,
    lastName: trainer.lastName,
    email: trainer.email,
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

//Training controls for member

async function createTraining(req, res) {

  await Training.create({
    ...req.body,
    member: req.user.userId,
    trainer: null
  });

  res.status(StatusCodes.OK).json({ msg: 'Training succesfully created.' })
}

async function getTrainings(req, res) {
  const { userId } = req.user;
  const trainings = await Training.find({ member: userId }).select('-__v');

  const myTrainings = trainings.filter(training => training.trainer === null);
  const trainersTrainings = trainings.filter(training => training.trainer !== null);

  res.status(StatusCodes.OK).json({myTrainings, trainersTrainings});
}

async function getOneTraining(req, res) {
  const { userId } = req.user;
  const { trainingId } = req.params;

  const training = await Training.findOne({ member: userId, _id: trainingId, trainer: null}).select('-__v');
  if(!training){
    throw new NotFoundError(`Training with id ${trainingId} does not exist.`)
  }
  
  res.status(StatusCodes.OK).json(training);
}

async function deleteTraining(req, res) {
  const { trainingId } = req.params;
  const { userId } = req.user;

  const training = await Training.findOne({
    _id:trainingId,
    member: userId
  });

  if (!training) {
    throw new NotFoundError(`Training with id: ${trainingId} does not exist.`);
  }
  if (training.trainer !== null) {
    throw new ForbiddenError(`Member cannot delete a training that was created by a trainer.`)
  }

  await Training.findByIdAndDelete(trainingId);

  res.status(StatusCodes.OK).json({ msg: 'Training succesfully deleted.' })
}

async function updateTraining(req, res) {
  const { userId } = req.user;
  const { trainingId } = req.params;
  const { title, notes, exercises } = req.body;

  const training = await Training.findOne({ member: userId, _id: trainingId });

  if (!training) {
    throw new NotFoundError(`Training with id: ${trainingId} does not exist.`);
  }
  if (training.trainer !== null) {
    throw new ForbiddenError(`Member cannot update a training that was created by a trainer.`)
  }

  const updatedTraining = await Training.findByIdAndUpdate(trainingId, {
    title,
    notes,
    exercises
  }, {
    returnDocument: 'after',
    runValidators: true
  }).select('-__v');

  res.status(StatusCodes.OK).json(updatedTraining);
}

export {
  getAllTrainers,
  getTrainer,
  updateMember,
  getMember,
  createTraining,
  getTrainings,
  deleteTraining,
  updateTraining,
  getOneTraining
}