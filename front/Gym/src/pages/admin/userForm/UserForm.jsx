import styles from './UserForm.module.css';
import { ErrorText, SuccesMessage, FailureMessage, PrimaryButton, BackButton } from '../../../components';
import { MemberData } from './MemberData';
import { TrainerData } from './TrainerData';

export function UserForm({
  mode,
  user,
  formData,
  errors,
  handleChange,
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
            <input type="text" name="firstName" className={errors.firstName ? styles['input-error'] : ''} value={formData.firstName} onChange={handleChange} />
            {errors.firstName && (<ErrorText text={'First name is required.'} />)}
          </div>

          <div className={styles['input-group']}>
            <label>Last Name</label>
            <input type="text" name="lastName" className={errors.lastName ? styles['input-error'] : ''} value={formData.lastName} onChange={handleChange} />
            {errors.lastName && (<ErrorText text={'Last name is required.'} />)}
          </div>

          <div className={styles['input-group']}>
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} >
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
          </div>

          {mode === 'create' &&
            <div className={styles['input-group']}>
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="member">Member</option>
                <option value="trainer">Trainer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          }

          <div className={styles['input-group']}>
            <label>Email</label>
            <input type="text" name="email" className={errors.email ? styles['input-error'] : ''} value={formData.email} onChange={handleChange} />
            {errors.email && (<ErrorText text={'Email is required.'} />)}
          </div>

          {mode === 'create' &&
            <div className={styles['input-group']}>
              <label>Password</label>
              <input type="password" name="password" className={errors.password ? styles['input-error'] : ''} value={formData.password} onChange={handleChange} />
              {errors.password && (<ErrorText text={'Password is required.'} />)}
            </div>
          }
        </div>

        <div className={styles['extra-section']}>

          {formData.role === 'member' &&
            <MemberData
              mode={mode}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              assignedTrainer={user?.memberData?.assignedTrainer}
              memberName={user?.firstName}
              memberId={user?._id}
            />
          }

          {formData.role === 'trainer' &&
            <TrainerData
              mode={mode}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              assignedMembers={user?.trainerData?.assignedMembers}
            />
          }
        </div>

        {successMessage && (<SuccesMessage message={successMessage} />)}
        {failureMessage && (<FailureMessage message={failureMessage} />)}

        <div className={styles['buttons-container']}>
          <BackButton />
          <PrimaryButton buttonText={submitText} handleClick={submitFunction} />
        </div>

      </div>
    </div>
  );
}