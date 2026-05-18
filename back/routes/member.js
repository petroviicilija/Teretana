import express from 'express';
import { getUser, deleteUser, updateUser } from '../controllers/users.js';
import { getAllTrainers } from '../controllers/member.js';

const router = express.Router();

router.route('/').get(getAllTrainers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;