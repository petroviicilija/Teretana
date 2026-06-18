import styles from './AdminUsers.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, PrimaryButton } from '../../../components';
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
    <div className={styles['users-page']}>
      <div className={styles['search-section']}>

        <div className={styles['header-section']}>
          <h1>Users</h1>
          <p>Manage all ThunderGym users</p>
        </div>

        <div className={styles['filters-container']}>
          <input type="text" value={searchText} placeholder='Search by name or email' onChange={(event) => setSearchText(event.target.value)} />
          <select name="role" value={searchRole} onChange={(event) => setSearchRole(event.target.value)}>
            <option value="">All Roles</option>
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>
          <PrimaryButton buttonText={'Search'} handleClick={getUsers} />
        </div>
      </div>

      <div className={styles['users-grid']}>
        {
          users.map((user) => {
            return <UserCard key={user.email} user={user} token={token} getUsers={getUsers} />
          })
        }
      </div>

      <div className={styles['page-buttons-container']}>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}