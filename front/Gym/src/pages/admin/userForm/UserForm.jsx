import styles from './UserForm.module.css';
import { ErrorText, SuccesMessage, FailureMessage, PrimaryButton, BackButton } from '../../../components';

export function UserForm({
  mode,
  firstName,
  firstNameError,
  setFirstName,
  lastName,
  lastNameError,
  setLastName,
  gender,
  setGender,
  role,
  setRole,
  email,
  emailError,
  setEmail,
  password,
  passwordError,
  setPassword,
  extraSection,
  successMessage,
  failureMessage,
  submitText,
  submitFunction
}) {


  return (
    <div className={styles['create-user-page']}>
      <div className={styles['create-user-card']}>

        {mode === 'create' ?
          <div className={styles['header-section']}>
            <h1>Create User</h1>
            <p>Add a new member, trainer or admin</p>
          </div>
          :
          <div className={styles['header-section']}>
            <h1>Edit User</h1>
            <p>Edit member, trainer or admin</p>
          </div>
        }

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

          {mode === 'create' ?
            <div className={styles['input-group']}>
              <label>Role</label>
              <select name="role" value={role} onChange={(event) => setRole(event.target.value)}>
                <option value="member">Member</option>
                <option value="trainer">Trainer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            : ''
          }

          <div className={styles['input-group']}>
            <label>Email</label>
            <input type="text" className={emailError ? `${styles['input-error']}` : ''} value={email} onChange={(event) => setEmail(event.target.value)} />
            {emailError && <ErrorText text={'Email is required.'} />}
          </div>

          {mode === 'create' ?
            <div className={styles['input-group']}>
              <label>Password</label>
              <input type="password" className={passwordError ? `${styles['input-error']}` : ''} value={password} onChange={(event) => setPassword(event.target.value)} />
              {passwordError && <ErrorText text={'Password is required.'} />}
            </div>
            : ''
          }

        </div>

        <div className={styles['extra-section']}>
          {extraSection()}
          {/* {role === 'member' && <MemberData dateStartError={dateStartError} dateStart={dateStart} setDate={setDateStart} />}
          {role === 'trainer' && <TrainerData price={price} priceError={priceError} specialization={specialization} specializationError={specializationError} setPrice={setPrice} setSpecialization={setSpecialization} />} */}
        </div>

        {successMessage && <SuccesMessage message={successMessage} />}
        {failureMessage && <FailureMessage message={failureMessage} />}

        <div className={styles['buttons-container']}>
          <BackButton />
          <PrimaryButton buttonText={submitText} handleClick={submitFunction} />
        </div>
      </div>
    </div>
  );
}