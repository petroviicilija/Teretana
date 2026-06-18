import styles from './AssignTrainerPage.module.css';
import axios from 'axios';
import { BackButton, PrimaryButton } from '../../../components'

export function AssignTrainerCard({ member, trainers, getMember, token }) {

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
            <PrimaryButton buttonText={'Unassign trainer'} handleClick={() => removeTrainer(member.memberData.assignedTrainer.id)} />
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
              <PrimaryButton buttonText={'Assign trainer'} handleClick={() => assignTrainer(trainer.id)} />
            </div>
          ))}
        </>}

          <BackButton />
    </div>
  )
}