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
  let representingPages;
  let firstPage;
  let lastPage;

  totalPages > 5 ? representingPages = 6 : representingPages = totalPages;
  if (page >= 4 && totalPages > 5) {
    firstPage = page - 2;
    lastPage = page + 2;
  } else {
    firstPage = 1;
    lastPage = totalPages;
  }

  const users = await User.find(queryObject).select('-__v').skip(skip).limit(limit);
  res.status(StatusCodes.OK).json({ users, totalPages, currentPage: Number(page) });
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
  createUser,
  getStats
}