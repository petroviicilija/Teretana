import express from 'express';
import { deleteUser, changePassword } from '../controllers/users.js';
import { getAllTrainers, getTrainer, updateMember, getMember, createTraining, getTrainings, deleteTraining, updateTraining, getOneTraining } from '../controllers/member.js';

const router = express.Router();

router.route('/trainers').get(getAllTrainers);
router.route('/training').post(createTraining).get(getTrainings);
router.route('/training/:trainingId').delete(deleteTraining).patch(updateTraining).get(getOneTraining);
router.route('/password').patch(changePassword);
router.route('/').get(getMember).patch(updateMember).delete(deleteUser);

export default router;