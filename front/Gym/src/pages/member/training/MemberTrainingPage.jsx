import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { TrainingCard } from './TrainingCard.jsx';
import { TrainerCard } from './TrainerCard.jsx';
import axios from 'axios';
import styles from './MemberTrainingPage.module.css';

export function MemberTrainingPage() {

  const { token } = useOutletContext();
  const [memberInfo, setMemberInfo] = useState();
  const [trainers, setTrainers] = useState();
  const [myTrainings, setMyTrainings] = useState([]);
  const [trainersTrainings, setTrainersTrainings] = useState([]);
  const navigate = useNavigate();

  async function getMemberInfo() {
    try {
      const res = await axios.get(`/api/v1/member`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMemberInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTrainers() {
    try {
      const res = await axios.get(`/api/v1/member/trainers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTrainers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTrainings() {
    try {
      const res = await axios.get('/api/v1/member/training', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMyTrainings(res.data.myTrainings);
      setTrainersTrainings(res.data.trainersTrainings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMemberInfo();
    getTrainers();
    getTrainings();
  }, []);

  if (!memberInfo || !trainers) return;

  return (
    <div className={styles['trainings-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1>My Training Plans</h1>
          <p>Create and manage your workouts</p>
        </div>

        <button className={styles['primary-btn']} onClick={() => navigate('../createTraining')}>
          + Create Training
        </button>
      </div>


      <div className={styles['trainings-container']}>
        <TrainingCard trainings={myTrainings} token={token} getTrainings={getTrainings} />
      </div>

      {memberInfo.memberData.assignedTrainer ?
        <div>
          <div className={styles['trainer-section-header']}>
            <h2>Your Personal Trainer</h2>
            <p>
              You are currently working with{' '}
              {memberInfo.memberData.assignedTrainer.firstName}{' '}
              {memberInfo.memberData.assignedTrainer.lastName}.
              Below you can find the training plans assigned by your trainer.
            </p>
          </div>
          <div className={styles['trainer-section-subheader']}>
            <h2>Trainer's Training Plans</h2>
            <p>Workout plans prepared specifically for you.</p>
          </div>
          <div className={styles['trainings-container']}>
            <TrainingCard trainings={trainersTrainings} />
          </div>
        </div>
        :
        <>
          <div className={styles['trainer-section-header']}>
            <h2>No Trainer Assigned</h2>
            <p>
              You are not currently assigned to a personal trainer.
              You can still create and manage your own training plans,
              or explore our trainers below.
            </p>
          </div>
          <div className={styles['trainer-section-subheader']}>
            <h2>Meet Our Trainers</h2>
            <p>
              Browse available trainers and find someone who matches your goals.
            </p>
          </div>
          <div className={styles['trainers-container']}>
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </>
      }
    </div >
  );
}