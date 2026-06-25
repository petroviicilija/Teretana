import { useState } from 'react';
import styles from './AdminCreate.module.css';
import { MemberData } from './MemberData.jsx';
import { TrainerData } from './TrainerData.jsx';
import { useOutletContext } from 'react-router';
import { BackButton, PrimaryButton, ErrorText, FailureMessage, SuccesMessage } from '../../../components';
import axios from 'axios';

export function AdminCreate() {

  const { token } = useOutletContext();

  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  //All users info
  const [role, setRole] = useState('member');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [gender, setGender] = useState('man');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //Memmber Info
  const [dateStart, setDateStart] = useState('');

  //Trainer info
  const [price, setPrice] = useState(0);
  const [specialization, setSpecialization] = useState('');

  //Errors
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [dateStartError, setDateStartError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [specializationError, setSpecializationError] = useState(false);

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

    let hasError;

    if (lastName === '') {
      setLastNameError(true);
      hasError = true;
    } else {
      setLastNameError(false);
    }
    if (firstName === '') {
      setFirstNameError(true);
      hasError = true;
    } else {
      setFirstNameError(false);
    }
    if (email === '') {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }
    if (password === '') {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (role === 'member') {
      if (dateStart === '') {
        setDateStartError(true)
        hasError = true;
      } else {
        setDateStartError(false);
      }
    }

    if (role === 'trainer') {
      if (specialization === '') {
        setSpecializationError(true)
        hasError = true;
      } else {
        setSpecializationError(false);
      }
      if (!price || price <= 0) {
        setPriceError(true)
        hasError = true;
      } else {
        setPriceError(false);
      }
    }

    if (hasError) return;

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

      setFailureMessage(error.response.data.msg);

      setTimeout(() => {
        setFailureMessage('');
      }, 3000);
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
            <input type="text" className={firstNameError ? `${styles['input-error']}` : ''} value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            {firstNameError && <ErrorText text={'First name is required.'} />}
          </div>

          <div className={styles['input-group']}>
            <label>Last Name</label>
            <input type="text" className={lastNameError ? `${styles['input-error']}` : ''} value={lastName} onChange={(event) => setLastName(event.target.value)} />
            {lastNameError && <ErrorText text={'Last name is required.'} />}
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
            <input type="text" className={emailError ? `${styles['input-error']}` : ''} value={email} onChange={(event) => setEmail(event.target.value)} />
            {emailError && <ErrorText text={'Email is required.'} />}
          </div>

          <div className={styles['input-group']}>
            <label>Password</label>
            <input type="password" className={passwordError ? `${styles['input-error']}` : ''} value={password} onChange={(event) => setPassword(event.target.value)} />
            {passwordError && <ErrorText text={'Password is required.'} />}
          </div>

        </div>

        <div className={styles['extra-section']}>
          {role === 'member' && <MemberData dateStartError={dateStartError} dateStart={dateStart} setDate={setDateStart} />}
          {role === 'trainer' && <TrainerData price={price} priceError={priceError} specialization={specialization} specializationError={specializationError} setPrice={setPrice} setSpecialization={setSpecialization} />}
        </div>

        {successMessage && <SuccesMessage message={successMessage} />}
        {failureMessage && <FailureMessage message={failureMessage} />}

        <div className={styles['buttons-container']}>
          <BackButton />
          <PrimaryButton buttonText={'Create User'} handleClick={createUser} />
        </div>
      </div>
    </div>
  )
}