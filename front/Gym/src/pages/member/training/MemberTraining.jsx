import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import styles from './MemberTraining.module.css';

export function MemberTraining() {

  const { token } = useOutletContext();
  const [memberInfo, setMemberInfo] = useState();
  const [trainers, setTrainers] = useState();

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

  useEffect(() => {
    getMemberInfo();
    getTrainers();
  }, []);

  if (!memberInfo || !trainers) return;

  return (
    <>
      {memberInfo.memberData.assignedTrainer ?
        <div>
          Your assigned trainer is {memberInfo.memberData.assignedTrainer.firstName} {memberInfo.memberData.assignedTrainer.lastName}
        </div>
        :
        <>
          You dont have assigned trainer.
          <div className={styles['trainers-container']}>
            Here are our trainers
            {trainers.map((trainer) => (
              <div className={styles['trainer-card']}>
                {trainer.firstName}
              </div>
            ))}
          </div>
        </>
      }
    </>
  );
}