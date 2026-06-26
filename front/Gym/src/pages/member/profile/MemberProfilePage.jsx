import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MemberProfilePage.module.css'
import { useNavigate, useOutletContext } from 'react-router';
import { ProfileForm } from '../../profileForm/ProfileFrom';
import { PrimaryButton } from '../../../components';

export function MemberProfilePage() {

  const { token } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [memberInfo, setMemberInfo] = useState();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function getMemberInfo() {
    try {
      const res = await axios.get(`/api/v1/member`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFormData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email
      });
      setMemberInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMemberInfo();
  }, []);

  if (!memberInfo) return;

  function renderMemberCard() {
    return (
      <>
        <div className={styles['section-title']}>
          <label>Membership</label>
        </div>
        <div className={styles['input-group']}>
          <label>Status</label>
          {memberInfo.memberData.isActive ? <div className={styles['active-status']}>Active</div>
            : <div className={styles['not-active-status']}>Not Active</div>}
        </div>
        <div className={styles['input-group']}>
          <label>Membership Start</label>
          <p>{memberInfo.memberData.membershipStart.split('T')[0]}</p>
        </div>

        <div className={styles['input-group']}>
          <label>Membership End</label>
          <p>{memberInfo.memberData.membershipEnd.split('T')[0]}</p>
        </div>
        {memberInfo.memberData.assignedTrainer ?
          <div className={styles['input-group']}>
            <label>Trainer</label>
            <div className={styles['trainer-card']}>
              <h4>
                {memberInfo.memberData.assignedTrainer.firstName} {memberInfo.memberData.assignedTrainer.lastName}
              </h4>
            </div>
          </div>
          :
          <div className={styles['input-group']}>
            <label>Trainer</label>
            <p>You don't have an assigned trainer</p>
          </div>
        }
        <div className={styles['btn-wrapper']}>
          <PrimaryButton buttonText={'Browse Trainers'} handleClick={() => navigate('/member/trainers')} />
        </div>
      </>
    )
  }

  return (
    <ProfileForm
      formData={formData}
      handleChange={handleChange}
      token={token}
      personalInfoPath={'/api/v1/member'}
      changePasswordPath={'/api/v1/member/password'}
      getInfo={getMemberInfo}
      renderSpecialCard={renderMemberCard}
    />
  );
}