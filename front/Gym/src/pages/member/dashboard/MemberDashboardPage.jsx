import styles from './MemberDashboardPage.module.css';
import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { PrimaryButton } from '../../../components';
import axios from 'axios';

export function MemberDashboardPage() {

  const { token } = useOutletContext();
  const [memberInfo, setMemberInfo] = useState();
  const [myTrainings, setMyTrainings] = useState([]);
  const [trainersTrainings, setTrainersTrainings] = useState([]);
  const navigate = useNavigate();

  async function getMemberInfo() {
    try {
      const res = await axios.get(`/api/v1/member`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMemberInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTrainings() {
    try {
      const res = await axios.get('/api/v1/member/training', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMyTrainings(res.data.myTrainings);
      setTrainersTrainings(res.data.trainersTrainings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMemberInfo();
    getTrainings();
  }, []);

  function calculateRemainingDays(membershipEnd) {
    const end = new Date(membershipEnd);
    const today = new Date();

    return Math.floor((end - today) / (1000 * 60 * 60 * 24));
  }

  if (!memberInfo || !myTrainings || !trainersTrainings) return;

  return (
    <div className={styles['dashboard-page']}>
      <div className={styles['page-header']}>
        <h1>Welcome back, {memberInfo.firstName}!</h1>
        <p>Stay consistent and keep progressing toward your goals.</p>
      </div>
      <div className={styles['dashboard-grid']}>
        <div className={styles['membership-card']}>
          <div className={styles['section-title']}>
            <label>Membership</label>
          </div>
          <div>
            <span>Status</span>
            {memberInfo.memberData.isActive ? <div className={styles['active-status']}>Active</div>
              : <div className={styles['not-active-status']}>Not Active</div>}
          </div>
          <div>
            <span>Expires</span>
            <p>{memberInfo.memberData.membershipEnd.split('T')[0]}</p>
          </div>
          <div>
            <span>Remaining</span>
            <p>{calculateRemainingDays(memberInfo.memberData.membershipEnd.split('T')[0])} days</p>
          </div>
        </div>

        <div className={styles['trainer-card']}>
          <div className={styles['section-title']}>
            <label>Trainer</label>
          </div>

          {memberInfo.memberData.assignedTrainer ?
            <>
              <div className={styles['trainer-name']}>
                <div className={styles['role-badge']}>
                  Your personal trainer
                </div>
                <p>{memberInfo.memberData.assignedTrainer.firstName} {memberInfo.memberData.assignedTrainer.lastName}</p>
              </div>

              <div>
                <span>Specialization</span>
                <p>{memberInfo.memberData.assignedTrainer.trainerData.specialization.join(' & ')}</p>
              </div>

              <div>
                <span>Trainer plans available</span>
                <p>{trainersTrainings.length}</p>
              </div>
            </>
            :
            <>
              You currently don't have an assigned trainer.
            </>
          }

        </div>

        <div className={styles['training-card']}>
          <div className={styles['section-title']}>
            <label>Trainings</label>
          </div>

          <div>
            <span>Training Plans</span>
            <p>{trainersTrainings.length + myTrainings.length}</p>
          </div>

          <div>
            <span>Personal Plans</span>
            <p>{myTrainings.length}</p>
          </div>

          <div>
            <span>Trainer Plans</span>
            <p>{trainersTrainings.length}</p>
          </div>


          <PrimaryButton buttonText={'View Training Plans'} handleClick={() => navigate('/member/trainings')} />
        </div>


        <div className={styles['trainer-card']}>
          <div className={styles['section-title']}>
            <label>Quick Actions</label>
          </div>

          <PrimaryButton buttonText={'Edit Profile'} handleClick={() => navigate('/member/profile')} />
          <PrimaryButton buttonText={'Browse Trainers'} handleClick={() => navigate('/member/trainers')} />
        </div>

      </div>
    </div>
  );
}