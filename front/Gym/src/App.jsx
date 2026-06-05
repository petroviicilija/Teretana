import './App.css';
import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/login/LoginPage.jsx';
import { AdminLayout, AdminDashboard, AdminUsers, AdminCreate } from './pages/admin/index.js';
import { EditUserPage } from './pages/editUser/EditUserPage.jsx';
import { MemberLayout, MemberDashboard, MemberProfile, MemberTraining } from './pages/member/index.js';
import { TrainerPage } from './pages/trainer/TrainerPage.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/admin' element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='createUser' element={<AdminCreate />} />
          <Route path='editUser/:userId' element={<EditUserPage />} />
        </Route>
        <Route path='/member' element={<MemberLayout />}>
          <Route index element={<MemberDashboard />} />
          <Route path='profile' element={<MemberProfile />} />
          <Route path='training' element={<MemberTraining />} />
        </Route>
        <Route path='/trainer' element={<TrainerPage />} />
      </Routes>
    </>
  )
}

export default App
