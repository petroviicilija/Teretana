import styles from './UserCard.module.css';
import axios from 'axios';
import EditButton from '../../../assets/editButton.png';
import DeleteButton from '../../../assets/deleteButton.png';
import { useNavigate } from 'react-router';

export function UserCard({ user, token, getUsers }) {

  const navigate = useNavigate();

  async function deleteUser() {

    await axios.delete(`/api/v1/admin/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    getUsers();
  }

  return (
    <div className={styles['user-container']}>
      <div className={styles['info-container']}>
        <div>
          {user.role}
        </div>
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className={styles['button-container']}>
        <img src={EditButton} className={styles['edit-button']} />
        <img src={DeleteButton} className={styles['delete-button']} onClick={deleteUser} />
      </div>
    </div>
  );
}