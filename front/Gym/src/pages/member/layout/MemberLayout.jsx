import styles from './MemberLayout.module.css';
import { NavBar } from '../../../components/NavBar';
import { Outlet } from 'react-router';
import { useState } from 'react';

export function MemberLayout() {

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={styles['member-page']}>
      <NavBar user={user} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`${styles['main-content']} ${collapsed ? styles['collapsed'] : ''}`}>
        <Outlet context={{ token, user, collapsed }} />
      </main>
    </div>
  );
}