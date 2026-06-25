import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { UserForm } from '../userForm/UserForm.jsx';
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
  const [dateEnd, setDateEnd] = useState('');

  //Trainer info
  const [price, setPrice] = useState(0);
  const [specialization, setSpecialization] = useState('');

  //Errors
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [dateStartError, setDateStartError] = useState(false);
  const [dateEndError, setDateEndError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [specializationError, setSpecializationError] = useState(false);

  async function createUser(createPayload) {

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
    <UserForm mode="create"
      firstName={firstName}
      firstNameError={firstNameError}
      setFirstName={setFirstName}
      lastName={lastName}
      lastNameError={lastNameError}
      setLastName={setLastName}
      gender={gender}
      setGender={setGender}
      role={role}
      setRole={setRole}
      email={email}
      emailError={emailError}
      setEmail={setEmail}
      password={password}
      passwordError={passwordError}
      setPassword={setPassword}
      dateStart={dateStart}
      dateStartError={dateStartError}
      setDateStart={setDateStart}
      dateEnd={dateEnd}
      dateEndError={dateEndError}
      setDateEnd={setDateEnd}
      price={price}
      priceError={priceError}
      specialization={specialization}
      specializationError={specializationError}
      setPrice={setPrice}
      setSpecialization={setSpecialization}
      successMessage={successMessage}
      failureMessage={failureMessage}
      submitText='Create User'
      submitFunction={createUser}
    />
  )
}