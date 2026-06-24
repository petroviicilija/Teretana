import styles from './TrainerProfilePage.module.css';
import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { ProfileForm } from '../../profileForm/ProfileFrom';
import { PrimaryButton } from '../../../components';
import axios from 'axios';

export function TraienrProfilePage() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [trainerInfo, setTrainerInfo] = useState();

  const { token } = useOutletContext();
  const navigate = useNavigate();

  async function getTrainerInfo() {

    try {
      const res = await axios.get('/api/v1/trainer', {
        headers: {
          Authorization: `Bearer ${token}`

        }
      });

      setTrainerInfo(res.data);
      setEmail(res.data.email);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrainerInfo();
  }, []);

  if (!trainerInfo) return;

  function renderTrainerCard() {
    return (
      <>
        <div className={styles['section-title']}>
          <label>Professional Information</label>
        </div>
        <div className={styles['input-group']}>
          <label>Working at</label>
          <p>ThunderGym</p>
        </div>
        <div className={styles['input-group']}>
          <label>Specialization</label>
          <p>{trainerInfo.trainerData.specialization.join(', ')}</p>
        </div>

        <div className={styles['input-group']}>
          <label>Hourly Rate</label>
          <p>{trainerInfo.trainerData.hourlyRate}€</p>
        </div>

        <div className={styles['input-group']}>
          <label>Assigned Members</label>
          <p>{trainerInfo.trainerData.assignedMembers.length}</p>
        </div>

        <div className={styles['btn-wrapper']}>
          <PrimaryButton buttonText={'Browse Clients'} handleClick={() => navigate('/trainer/members')} />
        </div>
      </>
    )
  }

  return (
    <ProfileForm firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      token={token}
      personalInfoPath={'/api/v1/trainer'}
      changePasswordPath={'/api/v1/trainer/password'}
      getInfo={getTrainerInfo}
      renderSpecialCard={renderTrainerCard}
    />
  );
}