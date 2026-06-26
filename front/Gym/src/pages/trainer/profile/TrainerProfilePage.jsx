import styles from './TrainerProfilePage.module.css';
import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { ProfileForm } from '../../profileForm/ProfileFrom';
import { PrimaryButton } from '../../../components';
import axios from 'axios';

export function TraienrProfilePage() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

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
      setFormData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email
      })
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
    <ProfileForm 
      formData={formData}
      handleChange={handleChange}
      token={token}
      personalInfoPath={'/api/v1/trainer'}
      changePasswordPath={'/api/v1/trainer/password'}
      getInfo={getTrainerInfo}
      renderSpecialCard={renderTrainerCard}
    />
  );
}