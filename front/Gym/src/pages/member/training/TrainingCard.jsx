import { useNavigate } from 'react-router';
import styles from './MemberTrainingPage.module.css';
import axios from 'axios';

export function TrainingCard({ trainings, token, getTrainings }) {

  const navigate = useNavigate();

  async function deleteTraining(trainingId) {

    try {
      await axios.delete(`/api/v1/member/training/${trainingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getTrainings();
    } catch (error) {
      console.log(error);
    }
  }

  if (!trainings) return;

  return (
    <>
      {trainings.map((training, index) => (
        <div key={index} className={styles['training-card']}>
          <div className={styles['header-section']}>
            <h2>{training.title}</h2>
          </div>
          <div className={styles['exercise-list']}>
            {training.exercises.map((exercise, index) => (
              <div key={exercise._id} className={styles['exercise-row']}>
                <span className={styles['exercise-number']}>
                  {index + 1}
                </span>
                <div className={styles['exercise-info']}>
                  <h4>{exercise.name}</h4>
                  <p> {exercise.sets} x {exercise.reps} {exercise.weight && ` • ${exercise.weight}kg`}</p>
                </div>
              </div>
            ))}
          </div>
          {training.notes && (
            <div className={styles['notes-section']}>
              <span>Notes</span>
              <p>{training.notes}</p>
            </div>
          )}
          <div className={styles['buttons-container']}>
            <button className={styles['primary-btn']} onClick={() => navigate(`../updateTraining/${training._id}`)}>Update training</button>
            <button className={styles['primary-btn']} onClick={() => deleteTraining(training._id)}>Remove training</button>
          </div>
        </div>
      ))}
    </>
  );
}