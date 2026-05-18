import express from 'express';
import { getUser, deleteUser, updateUser } from '../controllers/users.js';

const router = express.Router();

router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

export default router;