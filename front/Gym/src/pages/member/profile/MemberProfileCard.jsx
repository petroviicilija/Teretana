import { useState } from "react";
import styles from './MemberProfile.module.css';
import axios from "axios";

//Dodati ime za trenera kad se napravi dugme za dodavanje trenera

export function MemberProfileCard({ memberInfo, token , getMemberInfo }) {

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
      <div className={styles['member-info-container']}>

        <p>Personal Information</p>
        <div className={styles['input-group']}>
          First Name: <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        </div>
        <div className={styles['input-group']}>
          Last Name: <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </div>
        <div className={styles['input-group']}>
          Email: <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>

        <p>Membership</p>
        <div>
          Membership status: {memberInfo.memberData.isActive ? 'Active' : 'Inactive'}
        </div>
        <div>
          Expires: {memberInfo.memberData.membershipEnd.split('T')[0]}
        </div>

        <p>Trainer</p>
        <div>
          Assigned Trainer: {memberInfo.memberData.assignedTrainer ? 
          <>
            {memberInfo.memberData.assignedTrainer.firstName} {memberInfo.memberData.assignedTrainer.lastName}
          </>
           :
            <>
              You dont have assigned trainer <button>Assign Trainer</button>
            </>
          }
        </div>

        <button onClick={saveChanges} >Save changes</button>
      </div>

      <div className={styles['member-password-container']}>

        Security
        <div className={styles['password-group']}>
          Current Password: <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
        </div>
        <div className={styles['password-group']}>
          New Password: <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
        </div>
        <div className={styles['password-group']}>
          Confirm New Password: <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </div>

        <button onClick={changePassword}>Change Password</button>
      </div>
    </>
  )
}