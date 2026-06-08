import styles from './MemberTrainingPage.module.css';

export function TrainingCard({ trainings }) {

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
        </div>
      ))}
    </>
  );
}