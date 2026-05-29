import styles from './MemberCard.module.css';
import axios from 'axios';

export function MemberCard({ user, searchEmail, token }) {

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
      <div className={styles['left-section']}>

        <div className={styles['user-main-info']}>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <p>{user.email}</p>
        </div>

      </div>
      <div className={styles['extra-info']}>

        <div>
          <span>Status</span>
          { user.memberData.isActive ? <p className={styles['active-status']}>Active</p> : <p className={styles['not-active-status']}>Not Active</p> }
        </div>

        <div>
          <span>Membership End</span>
          <p>
            {user.memberData.membershipEnd.split('T')[0]}
          </p>
        </div>

      </div>
      <button className={styles['renew-button']} onClick={renewMembership} >Renew Membership</button>
    </div>
  );
}