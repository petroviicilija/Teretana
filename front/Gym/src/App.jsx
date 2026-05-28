import './App.css';
import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/login/LoginPage.jsx';
import { AdminLayout, AdminDashboard, AdminUsers, AdminCreate } from './pages/admin/index.js';
import { EditUserPage } from './pages/editUser/EditUserPage.jsx';
import { MemberPage } from './pages/member/MemberPage.jsx';
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
        <Route path='/member' element={<MemberPage />} />
        <Route path='/trainer' element={<TrainerPage />} />
      </Routes>
    </>
  )
}

export default App
