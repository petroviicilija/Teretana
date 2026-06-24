import styles from './UserCard.module.css';
import axios from 'axios';
import EditButton from '../../../assets/editButton.png';
import DeleteButton from '../../../assets/deleteButton.png';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../../components';

export function UserCard({ user, token, getUsers }) {

  const navigate = useNavigate();

  async function deleteUser() {
    try {
      await axios.delete(`/api/v1/admin/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles['user-container']}>
      <div className={styles['left-section']}>

        <div className={styles['role-badge']}>
          {user.role}
        </div>

        <div className={styles['user-main-info']}>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
        </div>

      </div>

      <div className={styles['extra-info']}>

        <div>
          <span>Gender</span>
          <p>{user.gender}</p>
        </div>

        {user.role === 'member' && (
          <>
            <div>
              <span>Membership Start</span>
              <p>{user.memberData?.membershipStart.split('T')[0]}</p>
            </div>

            <div>
              <span>Membership End</span>
              <p>{user.memberData?.membershipEnd.split('T')[0]}</p>
            </div>
            <div>
              <span>Status</span>
              {user.memberData?.isActive ?
                <p className={styles['active-status']}>Active</p> : <p className={styles['not-active-status']}>Not Active</p>}
            </div>
          </>
        )}

        {user.role === 'trainer' && (
          <>
            <div>
              <span>Specialization</span>
              <p>{user.trainerData?.specialization.join(', ')}</p>
            </div>

            <div>
              <span>Hourly Rate</span>
              <p>{user.trainerData?.hourlyRate}€</p>
            </div>
          </>
        )}
      </div>

      <div className={styles['button-container']}>
        {user.role === 'member' &&
          <PrimaryButton buttonText={user?.memberData.assignedTrainer ? 'Unassign Trainer' : 'Assign Trainer'} handleClick={() => navigate(`../assignTrainer/${user._id}`)} />
        }
        <img src={EditButton} className={styles['edit-button']} onClick={() => navigate(`../editUser/${user._id}`)} />
        <img src={DeleteButton} className={styles['delete-button']} onClick={deleteUser} />
      </div>
    </div>
  );
}