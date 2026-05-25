import styles from './AdminCreate.module.css';

export function TrainerData({price, specialization, setPrice, setSpecialization }) {
  return (
    <>
      <div className={styles['input-group']}>
        <label>Specialization</label>
        <input type="text" value={specialization} onChange={(event) => setSpecialization(event.target.value)} />
      </div>
      <div className={styles['input-group']}>
        <label> Price of private training (€) </label>
        <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
      </div>
    </>
  );
}