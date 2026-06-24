import styles from './MemberTrainingsPage.module.css';
import { PrimaryButton, BackButton } from '../../../components';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { TrainingCard } from './TrainingCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function MemberTrainingsPage() {

  const navigate = useNavigate();
  const { token } = useOutletContext();
  const { memberId } = useParams();

  const [trainings, setTrainings] = useState();
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(true);

  async function getTrainings() {
    try {
      const res = await axios.get(`/api/v1/trainer/trainings/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`

        }
      });

      setClient(res.data.client);
      setTrainings(res.data.trainings);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrainings();
  }, []);

  if (loading) return;

  return (
    <div className={styles['trainings-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1>{client.firstName}`s Training Plans</h1>
          <p>Create and manage workouts for your client</p>
        </div>

        <div className={styles['btn-wrapper']}>
          <BackButton />
          <PrimaryButton buttonText={'+ Create Training'} handleClick={() => navigate(`../createTraining/${memberId}`)} />
        </div>
      </div>


      <div className={styles['trainings-container']}>
        <TrainingCard trainings={trainings} token={token} getTrainings={getTrainings} memberId={memberId} />
      </div>

    </div >
  );
}