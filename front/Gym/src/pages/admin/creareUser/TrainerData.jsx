import styles from './AdminCreate.module.css';
import { ErrorText } from '../../../components';

export function TrainerData({ price, priceError, specialization, specializationError, setPrice, setSpecialization }) {
  return (
    <>
      <div className={styles['input-group']}>
        <label>Specialization</label>
        <input type="text" className={specializationError ? `${styles['input-error']}` : ''} value={specialization} onChange={(event) => setSpecialization(event.target.value)} />
        {specializationError && <ErrorText text={'Specialization is required.'} />}
      </div>
      <div className={styles['input-group']}>
        <label> Price of private training (€) </label>
        <input type="number" className={priceError ? `${styles['input-error']}` : ''}  value={price} onChange={(event) => setPrice(event.target.value)} />
        {priceError && <ErrorText text={'Price of private training is required.'} />}
      </div>
    </>
  );
}