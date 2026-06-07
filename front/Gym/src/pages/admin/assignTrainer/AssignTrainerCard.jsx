import styles from './AssignTrainerPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

export function AssignTrainerCard({ member, trainers, getMember, token }) {

  const navigate = useNavigate();

  async function assignTrainer(trainerId) {
    try {
      await axios.patch('/api/v1/admin/trainers', {
        memberId: member._id,
        trainerId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getMember();
    } catch (error) {
      console.log(error)
    }
  }

  async function removeTrainer(trainerId) {
    try {
      await axios.delete('/api/v1/admin/trainers', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          memberId: member._id,
          trainerId
        }
      });
      getMember();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles['assign-card']}>

      <div className={styles['header-section']}>
        <h1>Assign Trainer</h1>
        <p>Assign, change or remove a trainer</p>
      </div>

      {member.memberData.assignedTrainer ?
        <>
          <p>
            {member.firstName}'s personal trainer
          </p>
          <div className={styles['trainer-card']}>
            <div>
              <h4>
                {member.memberData.assignedTrainer.firstName} {member.memberData.assignedTrainer.lastName}
              </h4>
              <p>{member.memberData.assignedTrainer.email}</p>
            </div>
            <button className={styles['primary-btn']} onClick={() => removeTrainer(member.memberData.assignedTrainer.id)}>Remove trainer</button>
          </div>
        </>
        :
        <>
          <p>
            {member.firstName} does not have a personal trainer
          </p>
          {trainers.map((trainer) => (
            <div key={trainer.id} className={styles['trainer-card']}>
              <div>
                <h4>
                  {trainer.firstName} {trainer.lastName}
                </h4>
                <p>{trainer.email}</p>
              </div>
              <button className={styles['primary-btn']} onClick={() => assignTrainer(trainer.id)}>Assign trainer</button>
            </div>
          ))}
        </>}

        <button className={styles['secondary-btn']} onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}