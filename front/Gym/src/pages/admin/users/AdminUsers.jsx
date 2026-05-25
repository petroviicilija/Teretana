import styles from './AdminUsers.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router";
import { UserCard } from './UserCard.jsx';

export function AdminUsers() {

  const { token } = useOutletContext();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchRole, setSearchRole] = useState('');
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState();

  async function getUsers() {
    const res = await axios.get('/api/v1/admin', {
      params: {
        role: searchRole,
        search: searchText,
        page
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
    setPage(res.data.currentPage);
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, [page]);

  if (loading) return;

  return (
    <>
      <input type="text" placeholder='Search' onChange={(event) => setSearchText(event.target.value)} />
      <select name="role" value={searchRole} onChange={(event) => setSearchRole(event.target.value)}>
        <option value="">All</option>
        <option value="member">Member</option>
        <option value="trainer">Trainer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={getUsers}>Search</button>
      {
        users.map((user) => {
          return <UserCard key={user.email} user={user} token={token} getUsers={getUsers} />
        })
      }
      <div className={styles['page-buttons-container']}>
      {
        Array.from({length: totalPages},(_, index) => (
          <button key={index} className={styles['page-button']} onClick={() => setPage(index+1)}>{index + 1}</button>
        ))
      }
      </div>
    </>
  );
}