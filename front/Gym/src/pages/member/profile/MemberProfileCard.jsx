import { useState } from "react";
import { useNavigate } from "react-router";
import styles from './MemberProfilePage.module.css';
import axios from "axios";
import { PrimaryButton } from "../../../components";

//Dodati navigaciju za dugme da se vide dostupni treneri

export function MemberProfileCard({ memberInfo, token, getMemberInfo }) {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(memberInfo.firstName);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState(memberInfo.lastName);
  const [lastNameError, setLastNameError] = useState(false);
  const [email, setEmail] = useState(memberInfo.email);
  const [emailError, setEmailError] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  async function changePassword() {
    if (newPassword === confirmPassword) {
      try {
        await axios.patch('/api/v1/member/password', {
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
      await axios.patch('/api/v1/member', {
        firstName,
        lastName,
        email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getMemberInfo();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
          <div className={styles['section-title']}>
            <label>Membership</label>
          </div>
          <div className={styles['input-group']}>
            <label>Status</label>
            {memberInfo.memberData.isActive ? <div className={styles['active-status']}>Active</div>
              : <div className={styles['not-active-status']}>Not Active</div>}
          </div>
          <div className={styles['input-group']}>
            <label>Membership Start</label>
            <p>{memberInfo.memberData.membershipStart.split('T')[0]}</p>
          </div>

          <div className={styles['input-group']}>
            <label>Membership End</label>
            <p>{memberInfo.memberData.membershipEnd.split('T')[0]}</p>
          </div>
          {memberInfo.memberData.assignedTrainer ?
            <div className={styles['input-group']}>
              <label>Trainer</label>
              <div className={styles['trainer-card']}>
                <h4>
                  {memberInfo.memberData.assignedTrainer.firstName} {memberInfo.memberData.assignedTrainer.lastName}
                </h4>
              </div>
            </div>
            :
            <div className={styles['input-group']}>
              <label>Trainer</label>
              <p>You don't have an assigned trainer</p>
            </div>
          }
          <div className={styles['btn-wrapper']}>
            <PrimaryButton buttonText={'Browse Trainers'} handleClick={() => navigate('/member/trainers')} />
          </div>
        </div>
      </div>

      <div className={styles['profile-card']}>

        <div className={styles['section-title']}>
          <label>Security</label>
        </div>
        <div className={styles['password-group']}>
          <label>Current Password:</label> <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
        </div>
        <div className={styles['password-group']}>
          <label>New Password:</label> <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
        </div>
        <div className={styles['password-group']}>
          <label>Confirm new Password:</label> <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </div>

        <div className={styles['bottom-section']}>
          <PrimaryButton buttonText={'Change Password'} handleClick={changePassword} />
          {message && (<div className={styles['failure']}> {message} </div>)}
        </div>
      </div>
    </>
  )
}