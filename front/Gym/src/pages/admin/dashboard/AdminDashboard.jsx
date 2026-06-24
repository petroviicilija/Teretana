import styles from './AdminDashboard.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { PrimaryButton } from '../../../components';
import { MemberCard } from './MemberCard.jsx';
import { NewMemberCard } from './NewMemberCard.jsx';
import { PieChart } from './PieChart.jsx';

//New Member Card is used for new memebers and members whose memmbership expire soon

export function AdminDashboard() {

  const [stats, setStats] = useState();
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState();
  const [search, setSearch] = useState(false);
  const { token } = useOutletContext();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`/api/v1/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStats();
  }, []);

  async function searchEmail() {
    if (email !== '') {
      try {
        const res = await axios.get('/api/v1/admin', {
          params: {
            role: 'member',
            search: email,
            limit: 3
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data.users);
        setSearch(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearch(false);
    }
  }

  if (!stats) return;

  return (
    <div className={styles['dashboard-page']}>

      <div className={styles['dashboard-header']}>
        <h1>Dashboard</h1>
        <p>ThunderGym admin overview</p>
      </div>

      <div className={styles['search-section']}>

        <div className={styles['search-input-container']}>
          <input type="text" placeholder="Search member by email" onChange={(event) => setEmail(event.target.value)} />
          <PrimaryButton buttonText={'Search'} handleClick={searchEmail} />
        </div>

        {search && (
          <div className={styles['search-results']}>
            {users.map((user) => {
              return (
                <MemberCard key={user.email} user={user} searchEmail={searchEmail} token={token} />
              )
            })}
          </div>
        )}
      </div>

      <div className={styles['stats-grid']}>
        <div className={styles['stat-card']}>
          <p>Total Members</p>
          <h2>{stats.memberCount}</h2>
        </div>

        <div className={styles['stat-card']}>
          <p>Active Members</p>
          <h2>{stats.activeMembers}</h2>
        </div>

        <div className={styles['stat-card']}>
          <p>Inactive Members</p>
          <h2>{stats.inactiveMembers}</h2>
        </div>

        <div className={styles['stat-card']}>
          <p>Trainers</p>
          <h2>{stats.trainersCount}</h2>
        </div>

        <div className={styles['stat-card']}>
          <p>Registrations This Month</p>
          <h2>{stats.registrationCount}</h2>
        </div>

        <div className={`${styles['stat-card']} ${styles['warning-card']}`}>
          <p>Expiring Soon</p>
          <h2>{stats.expiringSoon.length}</h2>
        </div>

      </div>

      <div className={styles['middle-grid']}>
        <div className={styles['title']}>
          Members whose membership will soon expire
        </div>

        {
          stats.expiringSoon.map((member) => {
            return (
              <NewMemberCard key={member.email} member={member} forNewMembers={false} />
            )
          })
        }

      </div>

      <div className={styles['bottom-grid']}>
        <div className={styles['recent-members-card']}>

          <div className={styles['section-title']}>
            New Members
          </div>

          {
            stats.newMembers.map((member) => {
              return (
                <NewMemberCard key={member.email} member={member} forNewMembers={true} />
              );
            })
          }
        </div>

        <div className={styles['chart-card']}>
          <div className={styles['section-title']}>
            Male-to-female ratio
          </div>
          <PieChart memberCount={stats.memberCount} femaleCount={stats.femaleCount} maleCount={stats.maleCount} />
        </div>
      </div>

    </div>
  );
}