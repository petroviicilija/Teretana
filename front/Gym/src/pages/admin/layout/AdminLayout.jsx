import styles from './AdminLayout.module.css';
import { NavBar } from '../../../components/NavBar.jsx';
import { Outlet } from 'react-router';
import { useState } from 'react';
// import axios from 'axios';

export function AdminLayout() {

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={styles['admin-page']}>
      <NavBar user={user} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`${styles['main-content']} ${collapsed ? styles['collapsed'] : ''}`}>
        <Outlet context={{token, user, collapsed}}/>
      </main>
    </div>
  );
}