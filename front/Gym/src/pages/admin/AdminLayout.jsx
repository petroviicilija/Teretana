import styles from './AdminLayout.module.css';
import { NavBar } from '../../components/NavBar.jsx';
import { Outlet } from 'react-router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

export function AdminLayout() {

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={styles['admin-page']}>
      <NavBar user={user} />
      <main className={styles['main-content']}>
        <Outlet context={{token, user}}/>
      </main>
    </div>
  );
}