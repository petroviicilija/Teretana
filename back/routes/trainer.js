import express from 'express';
import { deleteUser } from '../controllers/users.js';
import { updateTrainer, getTrainer } from '../controllers/trainer.js';

const router = express.Router();

router.route('/').get(getTrainer).delete(deleteUser).patch(updateTrainer);

export default router;