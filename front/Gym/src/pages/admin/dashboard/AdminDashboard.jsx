import styles from './AdminDashboard.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { UserCard } from './UserCard.jsx';

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
  }

  if (!stats) return;

  return (
    <div>
      <input type="text" placeholder='Search by email' onChange={(event) => setEmail(event.target.value)} />
      <button onClick={searchEmail}>Search</button>
      {search && users.map((user) => {
        return (
          <UserCard key={user.email} user={user} searchEmail={searchEmail} token={token} />
        )
      })}
      <div className={styles['info-container']}>
        <div>
          <p>Number of members</p>
          {stats.memberCount}
        </div>
        <div>
          <p>Number of active members</p>
          {stats.activeMembers}
        </div>
        <div>
          <p>Number of inactive members</p>
          {stats.inactiveMembers}
        </div>
        <div>
          <p>Expiring soon</p>
          {stats.expiringSoon}
        </div>
      </div>
    </div>
  );
}