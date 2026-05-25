import './App.css';
import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/login/LoginPage.jsx';
//Admin Pages
import { AdminLayout, AdminDashboard, AdminMembers, AdminCreate } from './pages/admin/index.js';
import { MemberPage } from './pages/member/MemberPage.jsx';
import { TrainerPage } from './pages/trainer/TrainerPage.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/admin' element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path='members' element={<AdminMembers />} />
          <Route path='createUser' element={<AdminCreate />} />
        </Route>
        <Route path='/member' element={<MemberPage />} />
        <Route path='/trainer' element={<TrainerPage />} />
      </Routes>
    </>
  )
}

export default App
