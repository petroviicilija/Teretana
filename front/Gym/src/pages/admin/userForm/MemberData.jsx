import styles from './UserForm.module.css';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../../components';
import { ErrorText } from '../../../components';

export function MemberData({ mode, dateStart, dateStartError, setDateStart, dateEnd, dateEndError, setDateEnd, assignedTrainer, memberName, memberId }) {

  const navigate = useNavigate();

  return (
    <>
      <div className={styles['input-group']}>
        <label>Start Membership</label>
        <input type="date" className={dateStartError ? `${styles['input-error']}` : ''} value={dateStart} onChange={(event) => setDateStart(event.target.value)} />
        {dateStartError && <ErrorText text={'Start date is required.'} />}
      </div>
      <div className={styles['input-group']}>
        <label>End Membership</label>
        <input type="date" className={dateEndError ? `${styles['input-error']}` : ''} value={dateEnd} onChange={(event) => setDateEnd(event.target.value)} />
        {dateEndError && <ErrorText text={'End date is required.'} />}
      </div>
      {mode !== 'create' &&
        <>
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
                <PrimaryButton buttonText={'Unassign Trainer'} handleClick={() => navigate(`../assignTrainer/${memberId}`)} />
              </div>
            </div>
            :
            <div className={styles['input-group']}>
              <label>Personal trainer</label>
              <div className={styles['trainer-info']}>
                {memberName} does not have a personal trainer
                <PrimaryButton buttonText={'Assign trainer'} handleClick={() => navigate(`../assignTrainer/${memberId}`)} />
              </div>
            </div>
          }
        </>
      }
    </>
  );
}