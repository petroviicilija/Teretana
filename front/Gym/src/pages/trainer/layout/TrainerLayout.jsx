import styles from './TrainerLayout.module.css';
import { NavBar } from '../../../components';
import { Outlet } from 'react-router';
import { useState } from 'react';

export function TrainerLayout (){

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const[collapsed, setCollapsed] = useState(true);

  return(
    <div className={styles['trainer-page']}>
      <NavBar user={user} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`${styles['main-content']} ${collapsed ? styles['collapsed'] : ''}`}>
        <Outlet context={{ token, user, collapsed }} />
      </main>
    </div>
  );
}