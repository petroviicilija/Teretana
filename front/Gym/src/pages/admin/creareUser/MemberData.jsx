import styles from './AdminCreate.module.css';
import { ErrorText } from '../../../components';

export function MemberData({dateStart, setDate, dateStartError}){

  return(
    <div className={styles['input-group']}>
    <label>Start Membership</label>
      <input type="date" className={dateStartError ? `${styles['input-error']}` : ''} value={dateStart} onChange={(event) => setDate(event.target.value) }/>
      {dateStartError && <ErrorText text={'Start date is required.'} />}
    </div>
  );
}