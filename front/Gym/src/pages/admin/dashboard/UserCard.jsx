import styles from './UserCard.module.css';
import axios from 'axios';

export function UserCard({ user, searchEmail, token }) {

  async function renewMembership() {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    try {
      await axios.patch(`/api/v1/admin/${user._id}`, {
        memberData: {
          membershipStart: today.toISOString().split('T')[0],
          membershipEnd: nextMonth.toISOString().split('T')[0]
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      searchEmail();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles['user-card']}>
      {user.email}
      <div className={styles['status-container']}>
        <p>Status</p>
        {user.memberData.isActive ? <>Active</> : <>Not Active</>}
      </div>
      <button className={styles['renew-button']} onClick={renewMembership} >Renew Membership</button>
    </div>
  );
}