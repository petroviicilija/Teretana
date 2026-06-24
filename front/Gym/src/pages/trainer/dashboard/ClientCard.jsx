import styles from './ClientCard.module.css';

export function ClientCard({ member }) {

  return (
    <div className={styles['client-card']} >
      <div>
        <h4>
          {member.firstName} {member.lastName}
        </h4>
        <p>{member.email}</p>
      </div>
      {member.memberData.isActive ? <div className={styles['active-status']}>Active</div>
        : <div className={styles['not-active-status']}>Not Active</div>}
    </div>
  );
}