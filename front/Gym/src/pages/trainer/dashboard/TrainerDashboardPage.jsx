import styles from './TrainerDashboardPage.module.css';
import { PrimaryButton } from '../../../components';
import { ClientCard } from './ClientCard';
import { useNavigate, useOutletContext } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function TrainerDashboardPage() {

  const { token } = useOutletContext();
  const navigate = useNavigate();

  const [stats, setStats] = useState();

  async function getStats() {
    const res = await axios.get(`/api/v1/trainer/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setStats(res.data);
  }

  useEffect(() => {
    getStats();
  }, []);

  if (!stats) return;

  return (
    <div className={styles['dashboard-page']}>
      <div className={styles['page-header']}>
        <h1>Welcome back, {stats.trainer.firstName}!</h1>
        <p>Ready to push your athletes to the next level?</p>
      </div>
      <div className={styles['top-grid']}>
        <div className={styles['stat-card']}>
          <p>Clients</p>
          <h2>{stats.assignedMembers.length}</h2>
        </div>

        <div className={styles['stat-card']}>
          <p>Trainings</p>
          <h2>{stats.numberOfTrainings}</h2>
        </div>

        <div className={styles['stat-card']}>
          <p>Active Clients</p>
          <h2>{stats.activeClients}</h2>
        </div>

        <div className={`${styles['stat-card']} ${styles['inactive']}`}>
          <p>Inactive Clients</p>
          <h2>{stats.inactiveClients}</h2>
        </div>

        <div className={styles['stat-card']}>
          <p>New Clients</p>
          <h2>{stats.numberOfNewClients}</h2>
        </div>
      </div>

      <div className={styles['middle-grid']}>
        <div className={styles['assigned-members-container']}>
          <div className={styles['title']}>
            Clients
          </div>

          {
            stats.latestClients.map((member) => {
              return (
                <ClientCard key={member.email} member={member} />
              )
            })
          }
        </div>

        <div className={styles['quick-actions']}>
          <div className={styles['title']}>
            Quick Actions
          </div>
          <div className={styles['btn-wrapper']}>
            <PrimaryButton buttonText={'Edit Profile'} handleClick={() => navigate('/trainer/profile')} />
          </div>
          <div className={styles['btn-wrapper']}>
            <PrimaryButton buttonText={'View Clients'} handleClick={() => navigate('/trainer/members')} />
          </div>
        </div>

      </div>
    </div>
  );
}