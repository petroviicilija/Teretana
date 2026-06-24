import styles from './ClientCard.module.css';
import { PrimaryButton } from '../../../components';
import { useNavigate } from 'react-router';

export function ClientCard({ client }) {

  const navigate = useNavigate();

  return (
    <div className={styles['client-card']} >
      <div className={styles['left-section']}>
        <div className={styles['info']}>
          <h4>
            {client.firstName} {client.lastName}
          </h4>
          <p>{client.email}</p>
        </div>
        <div className={styles['status']}>
          <label>Status</label>
          {client.memberData.isActive ? <div className={styles['active-status']}>Active</div>
            : <div className={styles['not-active-status']}>Not Active</div>}
        </div>
      </div>
      <div>
        <PrimaryButton buttonText={`${client.firstName}'s trainings`} handleClick={() => navigate(`/trainer/trainings/${client._id}`)} />
      </div>
    </div>
  );
}