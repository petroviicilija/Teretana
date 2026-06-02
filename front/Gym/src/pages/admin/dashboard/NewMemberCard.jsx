import styles from './NewMemberCard.module.css';

export function NewMemberCard({member, forNewMembers}) {
  return (
    <div className={styles['new-member-card']} >
      <div>
        <h4>
          {member.firstName} {member.lastName}
        </h4>
        <p>{member.email}</p>
      </div>
        {forNewMembers ? <span>Membership registered on {member.createdAt.split('T')[0]}</span> : <span>Membership expire on {member.memberData.membershipEnd.split('T')[0]}</span> }
    </div>
  )
}