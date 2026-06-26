import styles from './UserForm.module.css';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../../components';
import { ErrorText } from '../../../components';

export function TrainerData({ mode, formData, errors, handleChange, assignedMembers }) {

  const navigate = useNavigate();

  return (
    <>
      <div className={styles['input-group']}>
        <label>Specialization</label>
        <input type="text" name="specialization" className={errors.specialization ? styles['input-error'] : ''} value={formData.specialization} onChange={handleChange} />
        {errors.specialization && <ErrorText text={'Specialization is required.'} />}
      </div>

      <div className={styles['input-group']}>
        <label>Price of private training (€)</label>
        <input type="number" name="price" className={errors.price ? styles['input-error'] : ''} value={formData.price} onChange={handleChange} />
        {errors.price && <ErrorText text={'Price of private training is required.'} />}
      </div>

      {mode !== 'create' &&
        <div className={styles['input-group']}>
          <label>Clients</label>
          {assignedMembers.length === 0 ?
            <>No clients assigned.</>
            :
            <>
              {assignedMembers.map((assignedMember) => (
                <div key={assignedMember._id} className={styles['client-trainer-card']}>
                  <div>
                    <h4>{assignedMember.firstName} {assignedMember.lastName}</h4>
                    <p>{assignedMember.email}</p>
                  </div>
                  <PrimaryButton buttonText={'Unassign Trainer'} handleClick={() => navigate(`../assignTrainer/${assignedMember._id}`)} />
                </div>
              ))}
            </>
          }
        </div>
      }
    </>
  );
}