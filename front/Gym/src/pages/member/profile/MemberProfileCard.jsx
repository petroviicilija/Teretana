import { useState } from "react";
import styles from './MemberProfilePage.module.css';
import axios from "axios";

//Dodati navigaciju za dugme da se vide dostupni treneri

export function MemberProfileCard({ memberInfo, token, getMemberInfo }) {

  const [firstName, setFirstName] = useState(memberInfo.firstName);
  const [lastName, setLastName] = useState(memberInfo.lastName);
  const [email, setEmail] = useState(memberInfo.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        console.log(error);
      }
    } else {
      console.log('Passwords dont match')
    }
  }

  async function saveChanges() {
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
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </div>
          <div className={styles['input-group']}>
            <label>Last Name: </label>
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </div>
          <div className={styles['input-group']}>
            <label>Email: </label>
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>

          <button onClick={saveChanges} className={styles['primary-btn']} >Save changes</button>
        </div>

        <div className={styles['profile-card']}>
          <div className={styles['membership-info']}>
            <div className={styles['section-title']}>
              <label>Membership</label>
            </div>
            <div>
              <span>Status</span>
              {memberInfo.memberData.isActive ? <div className={styles['active-status']}>Active</div>
                : <div className={styles['not-active-status']}>Not Active</div>}
            </div>
            <div>
              <span>Membership Start</span>
              <p>{memberInfo.memberData.membershipStart.split('T')[0]}</p>
            </div>

            <div>
              <span>Membership End</span>
              <p>{memberInfo.memberData.membershipEnd.split('T')[0]}</p>
            </div>
            {memberInfo.memberData.assignedTrainer ?
              <div>
                <span>Trainer</span>
                <div className={styles['trainer-card']}>
                  <h4>
                    {memberInfo.memberData.assignedTrainer.firstName} {memberInfo.memberData.assignedTrainer.lastName}
                  </h4>
                </div>
              </div>
              :
              <>
                <div>
                  <span>Trainer</span>
                  <div className={styles['no-trainer']}>
                    <p>You don't have an assigned trainer</p>
                  </div>
                </div>
                <button className={styles['primary-btn']}>
                  See Available Trainers
                </button>
              </>
            }

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

        <button onClick={changePassword} className={styles['primary-btn']}>Change Password</button>
      </div>
    </>
  )
}