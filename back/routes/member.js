import express from 'express';
import { deleteUser, changePassword } from '../controllers/users.js';
import { getAllTrainers, getTrainer, updateMember, getMember, createTraining, getTraining, deleteTraining, updateTraining } from '../controllers/member.js';

const router = express.Router();

router.route('/trainers').get(getAllTrainers);
router.route('/training').post(createTraining).get(getTraining).delete(deleteTraining);
router.route('/training/:id').delete(deleteTraining).patch(updateTraining);
router.route('/password').patch(changePassword);
router.route('/').get(getMember).patch(updateMember).delete(deleteUser);

export default router;