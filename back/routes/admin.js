import express from 'express';
import { getUser, deleteUser, updateUser } from '../controllers/users.js';
import { getAllUsers, createUser } from '../controllers/admin.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

export default router ;