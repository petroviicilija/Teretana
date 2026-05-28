import styles from './EditUserPage.module.css';
import { useState } from 'react';
import { MemberData } from './MemberData.jsx';
import { TrainerData } from './TrainerData.jsx';
import { useNavigate } from 'react-router';
import axios from 'axios';

export function EditUserCard({ user, token, userId }) {

  //All users info
  const [role, setRole] = useState(user.role);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);

  //Memmber Info
  const [dateStart, setDateStart] = useState(user?.memberData?.membershipStart.split('T')[0]);
  const [dateEnd, setDateEnd] = useState(user?.memberData?.membershipEnd.split('T')[0]);

  //Trainer info
  const [price, setPrice] = useState(user?.trainerData?.hourlyRate);
  const [specialization, setSpecialization] = useState(user?.trainerData?.specialization);

  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  function createPayload() {

    const roleMap = {
      member: {
        memberData: {
          membershipStart: dateStart,
          membershipEnd: dateEnd
        }
      },
      trainer: {
        trainerData: {
          specialization,
          hourlyRate: price
        }
      },
      admin: {}
    };

    return {
      firstName,
      lastName,
      email,
      role,
      gender,
      ...roleMap[role]
    }

  }

  async function editUser() {

    const payLoad = createPayload();

    try {
      await axios.patch(`/api/v1/admin/${userId}`, payLoad, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setSuccessMessage('User successfully edited!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles['edit-user-card']}>

      <div className={styles['header-section']}>
        <h1>Edit User</h1>
        <p>Edit member, trainer or admin</p>
      </div>

      <div className={styles['form-grid']}>

        <div className={styles['input-group']}>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        </div>

        <div className={styles['input-group']}>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </div>

        <div className={styles['input-group']}>
          <label>Gender</label>
          <select name="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>
        </div>

        <div className={styles['input-group']}>
          <label>Role</label>
          <select name="role" value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className={styles['input-group']}>
          <label>Email</label>
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>

      </div>

      <div className={styles['extra-section']}>
        {role === 'member' && <MemberData dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd} />}
        {role === 'trainer' && <TrainerData price={price} specialization={specialization} setPrice={setPrice} setSpecialization={setSpecialization} />}
      </div>

      {successMessage && (<div className={styles['success-message']}> {successMessage} </div>)}

      <div className={styles['buttons-container']}>
        <button className={styles['secondary-btn']} onClick={() => navigate('/admin/users')}>
          Back
        </button>
        <button className={styles['primary-btn']} onClick={editUser}>
          Edit User
        </button>
      </div>
    </div>
  );
}