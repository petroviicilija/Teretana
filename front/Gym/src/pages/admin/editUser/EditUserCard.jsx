import styles from './EditUserPage.module.css';
import { useState } from 'react';
import { MemberData } from './MemberData.jsx';
import { TrainerData } from './TrainerData.jsx';
import { BackButton, PrimaryButton, ErrorText, SuccesMessage, FailureMessage } from '../../../components/index.js';
import axios from 'axios';

export function EditUserCard({ user, token, userId }) {

  //All users info
  const { role } = user;
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

  //Errors
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dateStartError, setDateStartError] = useState(false);
  const [dateEndError, setDateEndError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [specializationError, setSpecializationError] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

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

    if (role === 'member') {
      if (dateStart === '') {
        setDateStartError(true)
        hasError = true;
      } else {
        setDateStartError(false);
      }
      if (dateEnd === '') {
        setDateEndError(true)
        hasError = true;
      } else {
        setDateEndError(false);
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
      setFailureMessage(error.response.data.msg);

      setTimeout(() => {
        setFailureMessage('');
      }, 3000);
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
          <label>Email</label>
          <input type="text" className={emailError ? `${styles['input-error']}` : ''} value={email} onChange={(event) => setEmail(event.target.value)} />
          {emailError && <ErrorText text={'Email is required.'} />}
        </div>

      </div>

      <div className={styles['extra-section']}>
        {role === 'member' && <MemberData
          dateStart={dateStart}
          setDateStart={setDateStart}
          dateEnd={dateEnd}
          dateStartError={dateStartError}
          setDateEnd={setDateEnd}
          dateEndError={dateEndError}
          assignedTrainer={user?.memberData?.assignedTrainer}
          memberName={user.firstName}
          memberId={user._id}
        />}
        {role === 'trainer' && <TrainerData
          assignedMembers={user?.trainerData?.assignedMembers}
          price={price}
          priceError={priceError}
          specialization={specialization}
          specializationError={specializationError}
          setPrice={setPrice}
          setSpecialization={setSpecialization}
        />}
      </div>

      {successMessage && <SuccesMessage message={successMessage} />}
      {failureMessage && <FailureMessage message={failureMessage} />}

      <div className={styles['buttons-container']}>
        <BackButton />
        <PrimaryButton buttonText={'Edit User'} handleClick={editUser} />
      </div>
    </div>
  );
}