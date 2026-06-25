import styles from './EditUserPage.module.css';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../../components';
import { ErrorText } from '../../../components';

export function TrainerData({price, priceError, specialization, specializationError, setPrice, setSpecialization, assignedMembers }) {

  const navigate = useNavigate();

  return (
    <>
      <div className={styles['input-group']}>
        <label>Specialization</label>
        <input type="text" className={specializationError ? `${styles['input-error']}` : ''} value={specialization} onChange={(event) => setSpecialization(event.target.value)} />
        {specializationError && <ErrorText text={'Specialization is required.'} />}
      </div>
      <div className={styles['input-group']}>
        <label> Price of private training (€) </label>
        <input type="number" className={priceError ? `${styles['input-error']}` : ''} value={price} onChange={(event) => setPrice(event.target.value)} />
        {priceError && <ErrorText text={'Price of private training is required.'} />}
      </div>
      <div className={styles['input-group']}>
        <label>Clients</label>
        {assignedMembers.length === 0 ? <>No clients assigned.</> 
        : 
        <>
          {assignedMembers.map((assignedMember) => (
            <div key={assignedMember._id} className={styles['client-trainer-card']}>
              <div>
                <h4>
                  {assignedMember.firstName} {assignedMember.lastName}
                </h4>
                <p>
                  {assignedMember.email}
                </p>
              </div>
              <PrimaryButton buttonText={'Unassign Trainer'} handleClick={() => navigate(`../assignTrainer/${assignedMember._id}`)} />
            </div>
          ))}
        </>
        }
      </div>
    </>
  );
}