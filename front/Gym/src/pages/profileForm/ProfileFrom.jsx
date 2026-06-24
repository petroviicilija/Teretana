import styles from './ProfileForm.module.css';
import { useState } from 'react';
import { PrimaryButton } from '../../components';
import axios from 'axios';

export function ProfileForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  token,
  personalInfoPath,
  changePasswordPath,
  getInfo,
  renderSpecialCard }) {

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  async function changePassword() {
    if (newPassword === confirmPassword) {
      try {
        await axios.patch(changePasswordPath, {
          currentPassword,
          newPassword
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('')
      } catch (error) {

        setMessage(error.response.data.msg);

        setTimeout(() => {
          setMessage('');
        }, 3000);
        console.log(error);
      }
    } else {
      setMessage('Passwords dont match!');

      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  async function saveChanges() {

    let hasError;

    if (firstName === '') {
      hasError = true;
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (lastName === '') {
      hasError = true;
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (email === '') {
      hasError = true;
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (hasError) return;

    try {
      await axios.patch(personalInfoPath, {
        firstName,
        lastName,
        email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getInfo();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-header']}>
        <h1>Profile</h1>
        <p>Manage your personal information</p>
      </div>
      <div className={styles['profile-grid']}>

        <div className={styles['profile-card']}>
          <div className={styles['section-title']}>
            Personal Information
          </div>
          <div className={styles['input-group']}>
            <label>First Name:</label>
            <input type="text" className={firstNameError ? `${styles['input-error']}` : ''} value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            {firstNameError && <p className={styles["error-text"]}>First name is required.</p>}
          </div>
          <div className={styles['input-group']}>
            <label>Last Name: </label>
            <input type="text" className={lastNameError ? `${styles['input-error']}` : ''} value={lastName} onChange={(event) => setLastName(event.target.value)} />
            {lastNameError && <p className={styles["error-text"]}>Last name is required.</p>}
          </div>
          <div className={styles['input-group']}>
            <label>Email: </label>
            <input type="text" className={emailError ? `${styles['input-error']}` : ''} value={email} onChange={(event) => setEmail(event.target.value)} />
            {emailError && <p className={styles["error-text"]}>Email name is required.</p>}
          </div>

          <div className={styles['btn-wrapper']}>
            <PrimaryButton buttonText={'Save changes'} handleClick={saveChanges} />
          </div>
        </div>

        <div className={styles['profile-card']}>
          {renderSpecialCard()}
        </div>
      </div>
      <div className={styles['profile-card']}>

        <div className={styles['section-title']}>
          <label>Security</label>
        </div>
        <div className={styles['password-group']}>
          <label>Current Password:</label>
          <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
        </div>
        <div className={styles['password-group']}>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
        </div>
        <div className={styles['password-group']}>
          <label>Confirm new Password:</label>
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </div>

        <div className={styles['bottom-section']}>
          <PrimaryButton buttonText={'Change Password'} handleClick={changePassword} />
          {message && (<div className={styles['failure']}> {message} </div>)}
        </div>
      </div>
    </div>
  );
}