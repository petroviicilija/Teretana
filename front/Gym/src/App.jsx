// import { useState } from 'react'
import './App.css';
import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/login/LoginPage.jsx';
import { AdminPage } from './pages/admin/AdminPage.jsx';
import { MemberPage } from './pages/member/MemberPage.jsx';
import { TrainerPage } from './pages/trainer/TrainerPage.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='admin' element={<AdminPage />} />
        <Route path='member' element={<MemberPage />} />
        <Route path='trainer' element={<TrainerPage />} />
      </Routes>
    </>
  )
}

export default App
