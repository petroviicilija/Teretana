import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { Training } from '../models/trainingPlan.js';

async function updateTrainer(req, res) {
  const { userId } = req.user;
  const { firstName, lastName, email } = req.body;

  const trainer = await User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    email
  }, {
    returnDocument: 'after',
    runValidators: true
  }).select('-__v');

  if (!trainer) {
    throw new NotFoundError(`Trainer with id:${userId} does not exist`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Trainer succesfully updated' });
}

async function getTrainer(req, res) {
  const { userId } = req.user;
  const trainer = await User.findById({ _id: userId }).select('-__v');

  if (!trainer) {
    throw new NotFoundError(`Trainer with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).json(trainer);
}

async function getStats(req, res) {
  const { userId } = req.user;
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const [trainer, latestClients, numberOfTrainings, activeClients, numberOfNewClients] = await Promise.all([
    User.findById(userId).select('-__v').populate(
      'trainerData.assignedMembers',
      'firstName lastName email memberData.membershipEnd'
    ),
    User.find({
      'memberData.assignedTrainer': userId
    })
      .sort({ 'memberData.assignedTrainerAt': -1 })
      .limit(5)
      .select(
        'firstName lastName email memberData.membershipEnd memberData.assignedTrainerAt'
      ),
    Training.countDocuments({ trainer: userId }),
    User.countDocuments({
      'memberData.assignedTrainer': userId,
      'memberData.membershipEnd': { $gt: today }
    }),
    User.countDocuments({
      'memberData.assignedTrainer': userId,
      'memberData.assignedTrainerAt': { $gte: oneMonthAgo }
    })
  ]);

  const assignedMembers = trainer.trainerData.assignedMembers;
  const inactiveClients = assignedMembers.length - activeClients;

  res.status(StatusCodes.OK).json({
    trainer,
    assignedMembers,
    latestClients,
    numberOfTrainings,
    activeClients,
    inactiveClients,
    numberOfNewClients
  });
}

async function getAllClients(req, res) {
  const { userId } = req.user;
  const { search } = req.query;

  const queryObject = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  if (search) {
    queryObject.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const totalUsers = await User.countDocuments({
    'memberData.assignedTrainer': userId,
    ...queryObject
  });
  const totalPages = Math.ceil(totalUsers / limit);

  const clients = await User.find({
    'memberData.assignedTrainer': userId,
    ...queryObject
  }).sort({ firstName: 1, lastName: 1 }).select('-__v').skip(skip).limit(limit);

  res.status(StatusCodes.OK).json({ clients, totalPages, currentPage: Number(page) });
}

async function getTrainings(req, res) {
  const { userId } = req.user;
  const { clientId } = req.params;

  const [trainings, client] = await Promise.all([
    Training.find({ trainer: userId, member: clientId }),
    User.findById(clientId).select('firstName')
  ]);

  res.status(StatusCodes.OK).json({ trainings, client });
}

async function createTraining(req, res) {
  const { userId } = req.user;
  const { clientId } = req.params;

  await Training.create({
    ...req.body,
    member: clientId,
    trainer: userId
  });

  res.status(StatusCodes.OK).json({ msg: 'Training succesfully created.' })
}

async function deleteTraining(req, res) {
  const { trainingId } = req.params;
  const { clientId } = req.params;
  const { userId } = req.user;

  const training = await Training.findOne({
    _id: trainingId,
    member: clientId,
    trainer: userId
  });

  if (!training) {
    throw new NotFoundError(`Training with id: ${trainingId} does not exist.`);
  }
  if (training.trainer === null) {
    throw new ForbiddenError(`Trainer cannot delete a training that was created by a member.`)
  }

  await Training.findByIdAndDelete(trainingId);

  res.status(StatusCodes.OK).json({ msg: 'Training succesfully deleted.' })
}


async function getTraining(req, res) {
  const { trainingId } = req.params;
  const { clientId } = req.params;
  const { userId } = req.user;

  const training = await Training.findOne({
    _id: trainingId,
    member: clientId,
    trainer: userId
  });

  if (!training) {
    throw new NotFoundError(`Training with id: ${trainingId} does not exist.`);
  }

  res.status(StatusCodes.OK).json(training);
}

async function updateTraining(req, res) {
  const { userId } = req.user;
  const { trainingId } = req.params;
  const { clientId } = req.params;
  const { title, notes, exercises } = req.body;

  const training = await Training.findOne({ member: clientId, _id: trainingId, trainer: userId });

  if (!training) {
    throw new NotFoundError(`Training with id: ${trainingId} does not exist.`);
  }
  if (training.trainer === null) {
    throw new ForbiddenError(`Trainer cannot update a training that was created by a member.`)
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
  updateTrainer,
  getTrainer,
  getStats,
  getAllClients,
  getTrainings,
  createTraining,
  deleteTraining,
  getTraining,
  updateTraining
}