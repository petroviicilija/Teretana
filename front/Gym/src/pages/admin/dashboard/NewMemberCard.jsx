import styles from './NewMemberCard.module.css';

export function NewMemberCard({member}) {
  return (
    <div key={member.email} className={styles['new-member-card']} >
      <div>
        <h4>
          {member.firstName} {member.lastName}
        </h4>
        <p>{member.email}</p>
      </div>
      <span>
        Membership registered on {member.createdAt.split('T')[0]}
      </span>
    </div>
  )
}