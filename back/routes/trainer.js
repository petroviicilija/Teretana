import express from 'express';
import { deleteUser, changePassword } from '../controllers/users.js';
import { updateTrainer, getTrainer, getStats, getAllClients, getTrainings, createTraining, deleteTraining, getTraining, updateTraining } from '../controllers/trainer.js';

const router = express.Router();

router.route('/password').patch(changePassword);
router.route('/stats').get(getStats);
router.route('/members').get(getAllClients);
router.route('/trainings/:clientId').get(getTrainings).post(createTraining);
router.route('/trainings/:clientId/:trainingId').delete(deleteTraining).get(getTraining).patch(updateTraining);
router.route('/').get(getTrainer).delete(deleteUser).patch(updateTrainer);

export default router;