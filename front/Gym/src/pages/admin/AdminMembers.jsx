import styles from './AdminMembers.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router";

export function AdminMembers() {

  const {token, user} = useOutletContext();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {
        users.map((user) => {
          return (
            <div key={user.email} className={styles['user-container']}>
              {user.firstName}
            </div>);
        })
      }
    </>
  );
}