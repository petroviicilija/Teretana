import './App.css';
import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/login/LoginPage.jsx';
import { AdminLayout, AdminDashboard, AdminUsers, AdminCreate, AssignTrainerPage, EditUserPage } from './pages/admin/';
import { MemberLayout, MemberDashboardPage, MemberProfilePage, MemberTrainingPage, CreateTrainingPage, UpdateTrainingPage, TrainersPage } from './pages/member/';
import { TrainerLayout, TrainerDashboardPage, TraienrMembersPage, TraienrProfilePage, MemberTrainingsPage, TrainerCreateTrainingPage, TrainerUpdateTrainigPage } from './pages/trainer/';
import { NotFoundPage } from './pages/404/NotFoundPage.jsx';

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
          <Route path='trainers' element={<TrainersPage />} />
        </Route>
        <Route path='/trainer' element={<TrainerLayout />} >
          <Route index element={<TrainerDashboardPage />} />
          <Route path='members' element={<TraienrMembersPage />} />
          <Route path='profile' element={<TraienrProfilePage />}/>
          <Route path='trainings/:memberId' element={<MemberTrainingsPage />} />
          <Route path='createTraining/:memberId' element={<TrainerCreateTrainingPage />} />
          <Route path='updateTraining/:memberId/:trainingId' element={<TrainerUpdateTrainigPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
