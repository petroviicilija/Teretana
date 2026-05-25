import styles from './AdminCreate.module.css';

export function MemberData({dateStart, setDate}){

  return(
    <div className={styles['input-group']}>
    <label>Start Membership</label>
      <input type="date" value={dateStart} onChange={(event) => setDate(event.target.value) }/>
    </div>
  );
}