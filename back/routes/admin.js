import express from 'express';
import { deleteUser } from '../controllers/users.js';
import { getAllUsers, createUser, getStats, updateUser, getUser } from '../controllers/admin.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/stats').get(getStats);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

export default router ;