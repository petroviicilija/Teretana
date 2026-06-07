import styles from './EditUserPage.module.css';
import { useNavigate } from 'react-router';

export function MemberData({ dateStart, setDateStart, dateEnd, setDateEnd, assignedTrainer, memberName, memberId }) {

  const navigate = useNavigate();

  return (
    <>
      <div className={styles['input-group']}>
        <label>Start Membership</label>
        <input type="date" value={dateStart} onChange={(event) => setDateStart(event.target.value)} />
      </div>
      <div className={styles['input-group']}>
        <label>End Membership</label>
        <input type="date" value={dateEnd} onChange={(event) => setDateEnd(event.target.value)} />
      </div>
      {assignedTrainer ?
        <div className={styles['input-group']}>
          <label>Personal trainer</label>
          <div key={assignedTrainer._id} className={styles['client-trainer-card']}>
            <div>
              <h4>
                {assignedTrainer.firstName} {assignedTrainer.lastName}
              </h4>
              <p>
                {assignedTrainer.email}
              </p>
            </div>
            <button className={styles['primary-btn']} onClick={() => navigate(`../assignTrainer/${memberId}`)}>Unassign Trainer</button>
          </div>
        </div>
        :
        <div className={styles['input-group']}>
          <label>Personal trainer</label>
          <div className={styles['trainer-info']}>
            {memberName} does not have a personal trainer
            <button className={styles['primary-btn']} onClick={() => navigate(`../assignTrainer/${memberId}`)}>Assign trainer</button>
          </div>
        </div>
      }
    </>
  );
}