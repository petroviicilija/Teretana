import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { TrainingCard } from './TrainingCard.jsx';
import axios from 'axios';
import styles from './MemberTrainingPage.module.css';

export function MemberTrainingPage() {

  const { token } = useOutletContext();
  const [memberInfo, setMemberInfo] = useState();
  const [trainers, setTrainers] = useState();
  const [myTrainings, setMyTrainings] = useState([]);
  const [trainersTrainings, setTrainersTrainings] = useState([]);

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
    <>
      <h1>My training plans</h1>
      <div className={styles['trainings-container']}>
        <TrainingCard trainings={myTrainings} />
      </div>

      {memberInfo.memberData.assignedTrainer ?
        <div>
          Your assigned trainer is {memberInfo.memberData.assignedTrainer.firstName} {memberInfo.memberData.assignedTrainer.lastName}
          <h1>
            Trainers training plans
          </h1>
          <div className={styles['trainings-container']}>
            <TrainingCard trainings={trainersTrainings} />
          </div>
        </div>
        :
        <>
          You dont have assigned trainer.
          <div className={styles['trainers-container']}>
            Here are our trainers
            {trainers.map((trainer) => (
              <div className={styles['trainer-card']}>
                {trainer.firstName} {trainer.lastName}
              </div>
            ))}
          </div>
        </>
      }
    </>
  );
}