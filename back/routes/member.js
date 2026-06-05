import express from 'express';
import { deleteUser, changePassword } from '../controllers/users.js';
import { getAllTrainers, getTrainer, updateMember, getMember, assignTrainer } from '../controllers/member.js';

const router = express.Router();

router.route('/trainers').get(getAllTrainers);
router.route('/assign-trainer').patch(assignTrainer)
router.route('/password').patch(changePassword);
router.route('/').get(getMember).patch(updateMember).delete(deleteUser);

export default router;