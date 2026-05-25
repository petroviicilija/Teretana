import styles from './AdminMembers.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router";
import { UserCard } from './UserCard.jsx';

export function AdminMembers() {

  const { token, user } = useOutletContext();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchRole, setSearchRole ] = useState('all');

  async function getUsers() {
    const res = await axios.get('/api/v1/admin', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return;

  return (
    <>
      <select name="role" value={searchRole} onChange={(event) => setSearchRole(event.target.value)}>
        <option value="all">All</option>
        <option value="member">Member</option>
        <option value="trainer">Trainer</option>
        <option value="admin">Admin</option>
      </select>
      {
        users.map((user) => {
          return <UserCard key={user.email} user={user} token={token} getUsers={getUsers} />
        })
      }
    </>
  );
}