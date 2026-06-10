import styles from './MemberTrainingPage.module.css';

export function TrainerCard({trainer}) {
  return (
    <div className={styles['trainer-card']}>
      <div className={styles['left-section']}>
        <div className={styles['trainer-main-info']}>
          <h2>
            {trainer.firstName} {trainer.lastName}
          </h2>
          <p>{trainer.email}</p>
        </div>
      </div>
      <div className={styles['extra-info']}>
        <div>
          <span>Specialization</span>
          <p>{trainer.specialization.join(', ')}</p>
        </div>
      </div>
      <div className={styles['right-section']}>
        <div className={styles['extra-info']}>
          <div>
            <span>Hourly Rate</span>
            <p>{trainer.hourlyRate}€</p>
          </div>
        </div>
      </div>
    </div>
  )
}