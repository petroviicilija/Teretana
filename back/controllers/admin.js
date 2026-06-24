import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

async function getAllUsers(req, res) {

  const { role, search } = req.query;
  const queryObject = {};
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  if (role) {
    queryObject.role = role
  }

  if (search) {
    queryObject.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const totalUsers = await User.countDocuments(queryObject);
  const totalPages = Math.ceil(totalUsers / limit);

  const users = await User.find(queryObject).select('-__v').skip(skip).limit(limit);
  res.status(StatusCodes.OK).json({ users, totalPages, currentPage: Number(page) });
}

async function getAllTrainers(req, res) {
  const Alltrainers = await User.find({ role: 'trainer' }).sort({ firstName: 1, lastName: 1 }).select('-__v');
  const trainers = Alltrainers.map((trainer) => ({
    firstName: trainer.firstName,
    lastName: trainer.lastName,
    email: trainer.email,
    id: trainer._id
  }));

  res.status(StatusCodes.OK).json(trainers);
}

async function getUser(req, res) {
  const userId = req.params.id;
  const user = await User.findById({ _id: userId }).select('-__v');

  if (!user) {
    throw new NotFoundError(`User with id:${userId} does not exist`)
  }

  if (user.role === 'member') {
    await user.populate(
      'memberData.assignedTrainer',
      'firstName lastName email trainerData.specialization trainerData.hourlyRate'
    )
  } else if (user.role === 'trainer') {
    await user.populate(
      'trainerData.assignedMembers',
      'firstName lastName email'
    )
  }

  res.status(StatusCodes.OK).json(user);
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    returnDocument: 'after',
    runValidators: true
  }).select('-__v');

  if (!user) {
    throw new NotFoundError(`User with id:${userId} does not exist`)
  }

  res.status(StatusCodes.OK).json(user);
}

async function assignTrainer(req, res) {

  const { memberId, trainerId } = req.body;

  const member = await User.findOne({ _id: memberId, role: 'member' });
  const trainer = await User.findOne({ _id: trainerId, role: 'trainer' });

  if (!member || !trainer) {
    throw new NotFoundError('Trainer or member does not exist.');
  }
  if (member.memberData?.assignedTrainer) {
    throw new BadRequestError('Member already has an assigned trainer.');
  }

  await Promise.all([
    User.findByIdAndUpdate(memberId, {
      'memberData.assignedTrainer': trainerId,
      'memberData.assignedTrainerAt': new Date()
    }, {
      returnDocument: 'after',
      runValidators: true
    }).select('-__v'),
    User.findByIdAndUpdate(trainerId, {
      $addToSet: {
        'trainerData.assignedMembers': memberId
      }
    }, {
      returnDocument: 'after',
      runValidators: true
    }).select('-__v')
  ]);

  res.status(StatusCodes.OK).json({ msg: 'Trainer assigned.' });
}

async function removeTrainer(req, res) {
  const { memberId, trainerId } = req.body;

  const member = await User.findOne({ _id: memberId, role: 'member' });
  const trainer = await User.findOne({ _id: trainerId, role: 'trainer' });

  if (!member || !trainer) {
    throw new NotFoundError('Trainer or member does not exist.');
  }
  if (!member.memberData?.assignedTrainer) {
    throw new BadRequestError('Member does not have assigned trainer.');
  }

  await Promise.all([
    User.findByIdAndUpdate(memberId, {
      $unset: {
        'memberData.assignedTrainer': 1,
        'memberData.assignedTrainerAt': 1
      },
    }, {
      returnDocument: 'after',
      runValidators: true
    }).select('-__v'),
    User.findByIdAndUpdate(trainerId, {
      $pull: { 'trainerData.assignedMembers': memberId }
    }, {
      returnDocument: 'after',
      runValidators: true
    }).select('-__v')
  ]);

  res.status(StatusCodes.OK).json({ msg: 'Trainer succesfully removed.' })
}

async function createUser(req, res) {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).send('User is created');
}

async function getStats(req, res) {

  const today = new Date();
  const nextWeek = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const [memberCount, activeMembers, expiringSoon, maleCount, registrationCount, newMembers, trainersCount] = await Promise.all([
    User.countDocuments({ role: 'member' }),
    User.countDocuments({
      role: 'member',
      'memberData.membershipEnd': { $gt: today }
    }),
    User.find({
      role: 'member',
      'memberData.membershipEnd': {
        $gt: today,
        $lt: nextWeek
      }
    }).select('-__v').limit(5),
    User.countDocuments({
      role: 'member',
      gender: 'man'
    }),
    User.countDocuments({
      role: 'member',
      createdAt: {
        $gte: firstDayOfMonth
      }
    }),
    User.find({ role: 'member' }).select('-__v').sort({ createdAt: -1 }).limit(5),
    User.countDocuments({
      role: 'trainer'
    })
  ]);

  const femaleCount = memberCount - maleCount;
  const inactiveMembers = memberCount - activeMembers;

  res.status(StatusCodes.OK).json({
    memberCount,
    activeMembers,
    inactiveMembers,
    expiringSoon,
    maleCount,
    femaleCount,
    registrationCount,
    newMembers,
    trainersCount
  });
}

export {
  getAllUsers,
  getAllTrainers,
  createUser,
  getStats,
  updateUser,
  getUser,
  assignTrainer,
  removeTrainer
}