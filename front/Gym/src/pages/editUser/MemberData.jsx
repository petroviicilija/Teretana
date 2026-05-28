import styles from './EditUserPage.module.css';

export function MemberData({ dateStart, setDateStart, dateEnd, setDateEnd }) {

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
    </>
  );
}