import './App.css';
import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/login/LoginPage.jsx';
import { AdminLayout, AdminDashboard, AdminUsers, AdminCreate, AssignTrainerPage, EditUserPage } from './pages/admin/index.js';
import { MemberLayout, MemberDashboardPage, MemberProfilePage, MemberTrainingPage, CreateTrainingPage, UpdateTrainingPage } from './pages/member/index.js';
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
          <Route path='assignTrainer/:memberId' element={<AssignTrainerPage />} />
        </Route>
        <Route path='/member' element={<MemberLayout />}>
          <Route index element={<MemberDashboardPage />} />
          <Route path='profile' element={<MemberProfilePage />} />
          <Route path='trainings' element={<MemberTrainingPage />} />
          <Route path='createTraining' element={<CreateTrainingPage />} />
          <Route path='updateTraining/:trainingId' element={<UpdateTrainingPage />} />
        </Route>
        <Route path='/trainer' element={<TrainerPage />} />
      </Routes>
    </>
  )
}

export default App
