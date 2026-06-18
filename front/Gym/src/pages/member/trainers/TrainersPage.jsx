import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TrainersPage.module.css';
import { useOutletContext } from 'react-router';
import { TrainerCard } from './TrainerCard';
import { BackButton } from '../../../components';

export function TrainersPage() {

  const [trainers, setTrainers] = useState();
  const { token } = useOutletContext();

  async function getTrainers() {
    try {
      const res = await axios.get('/api/v1/member/trainers', {
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
    getTrainers();
  }, []);

  if (!trainers) return;

  console.log(trainers);

  return (
    <div className={styles['trainers-page']}>
      <div className={styles['trainers-card']}>
        <div className={styles['header-section']}>
          <h1>Meet Our Trainers</h1>
          <p>Browse available trainers and find someone who matches your goals.</p>
        </div>
        <div className={styles['trainers-container']}>
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
        <div className={styles['button-container']}>
          <BackButton />
        </div>
      </div>
    </div>
  );
}