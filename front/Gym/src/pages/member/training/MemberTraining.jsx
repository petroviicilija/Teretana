import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import styles from './MemberTraining.module.css';

export function MemberTraining() {

  const { token } = useOutletContext();
  const [memberInfo, setMemberInfo] = useState();
  const [trainers, setTrainers] = useState();

  async function getMemberInfo() {
    const res = await axios.get(`/api/v1/member`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setMemberInfo(res.data);
  }

  async function getTrainers() {
    const res = await axios.get(`/api/v1/member/trainers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setTrainers(res.data);
  }

  useEffect(() => {
    getMemberInfo();
    getTrainers();
  }, []);

  async function assignTrainer(trainerId) {
    try {
      await axios.patch('/api/v1/member/assign-trainer', {
        trainerId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getMemberInfo();
    } catch (error) {
      console.log(error)
    }
  }

  if (!memberInfo || !trainers) return;

  return (
    <>
      {memberInfo.memberData.assignedTrainer ?
        <div>
          Your assigned trainer is {memberInfo.memberData.assignedTrainer.firstName} {memberInfo.memberData.assignedTrainer.lastName}
          <button onClick={() => assignTrainer(null)}>Remove him</button>
        </div>
        :
        <>
          You dont have assigned trainer.
          <div className={styles['trainers-container']}>
            Here are our trainers
            {trainers.map((trainer) => (
              <div className={styles['trainer-card']}>
                {trainer.firstName} <button onClick={() => assignTrainer(trainer.id)}>Assign this Trainer</button>
              </div>
            ))}
          </div>
        </>
      }
    </>
  );
}