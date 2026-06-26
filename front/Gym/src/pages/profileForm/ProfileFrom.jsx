import styles from './ProfileForm.module.css';
import { useState } from 'react';
import { PrimaryButton, ErrorText, SuccesMessage, FailureMessage } from '../../components';
import axios from 'axios';

export function ProfileForm({
  formData,
  handleChange,
  token,
  personalInfoPath,
  changePasswordPath,
  getInfo,
  renderSpecialCard }) {

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [successMessagePassword, setSuccessMessagePassword] = useState('');
  const [failureMessagePassword, setFailureMessagePassword] = useState('');

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
        setSuccessMessagePassword('Succesfully changed password');
        setTimeout(() => {
          setSuccessMessagePassword('');
        }, 3000);
      } catch (error) {

        setFailureMessagePassword(error.response.data.msg);

        setTimeout(() => {
          setFailureMessagePassword('');
        }, 3000);
        console.log(error);
      }
    } else {
      setFailureMessagePassword('Passwords dont match!');

      setTimeout(() => {
        setFailureMessagePassword('');
      }, 3000);
    }
  }

  async function saveChanges() {

    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      await axios.patch(personalInfoPath, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getInfo();

      setSuccessMessage('Changes saved!');

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
            <input type="text" className={errors.firstName ? `${styles['input-error']}` : ''} name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <ErrorText text={'First name is required.'} />}
          </div>
          <div className={styles['input-group']}>
            <label>Last Name: </label>
            <input type="text" className={errors.lastName ? `${styles['input-error']}` : ''} name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <ErrorText text={'Last name is required.'} />}
          </div>
          <div className={styles['input-group']}>
            <label>Email: </label>
            <input type="text" className={errors.email ? `${styles['input-error']}` : ''} name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <ErrorText text={'Email name is required.'} />}
          </div>

          <div className={styles['btn-wrapper']}>
            <PrimaryButton buttonText={'Save changes'} handleClick={saveChanges} />
            {successMessage && <SuccesMessage message={successMessage} />}
            {failureMessage && <FailureMessage message={failureMessage} />}
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
          {successMessagePassword && <SuccesMessage message={successMessagePassword} />}
          {failureMessagePassword && <FailureMessage message={failureMessagePassword} />}
        </div>
      </div>
    </div>
  );
}