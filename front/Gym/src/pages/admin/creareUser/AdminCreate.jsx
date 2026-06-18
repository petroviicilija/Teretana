import { useState } from 'react';
import styles from './AdminCreate.module.css';
import { MemberData } from './MemberData.jsx';
import { TrainerData } from './TrainerData.jsx';
import { useOutletContext } from 'react-router';
import { BackButton, PrimaryButton } from '../../../components';
import axios from 'axios';

export function AdminCreate() {

  const { token } = useOutletContext();

  const [successMessage, setSuccessMessage] = useState('');

  //All users info
  const [role, setRole] = useState('member');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('man');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Memmber Info
  const [dateStart, setDateStart] = useState();

  //Trainer info
  const [price, setPrice] = useState();
  const [specialization, setSpecialization] = useState('');

  function setDateEnd(dateStart) {

    const date = new Date(dateStart);
    date.setMonth(date.getMonth() + 1);

    return date.toISOString().split('T')[0];
  }

  function createPayload() {

    let dateEnd;
    if (role === 'member') {
      dateEnd = setDateEnd(dateStart);
    }

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
      password,
      role,
      gender,
      ...roleMap[role]
    }
  }

  async function createUser() {

    const payLoad = createPayload();

    try {
      await axios.post('/api/v1/admin', payLoad, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setSuccessMessage('New user successfully created!');

      setFirstName('');
      setLastName('');
      setGender('man');
      setEmail('');
      setPassword('');
      setRole('member');
      setDateStart('');
      setPrice('');
      setSpecialization('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles['create-user-page']}>
      <div className={styles['create-user-card']}>

        <div className={styles['header-section']}>
          <h1>Create User</h1>
          <p>Add a new member, trainer or admin</p>
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

          <div className={styles['input-group']}>
            <label>Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

        </div>

        <div className={styles['extra-section']}>
          {role === 'member' && <MemberData dateStart={dateStart} setDate={setDateStart} />}
          {role === 'trainer' && <TrainerData price={price} specialization={specialization} setPrice={setPrice} setSpecialization={setSpecialization} />}
        </div>

        {successMessage && (<div className={styles['success-message']}> {successMessage} </div>)}

        <div className={styles['buttons-container']}>
          <BackButton />
          <PrimaryButton buttonText={'Create User'} handleClick={createUser} />
        </div>
      </div>
    </div>
  )
}