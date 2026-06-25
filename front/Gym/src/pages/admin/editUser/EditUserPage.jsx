import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { UserForm } from '../userForm/UserForm.jsx';
import axios from 'axios';

export function EditUserPage() {

  const { token } = useOutletContext();
  const { userId } = useParams();
  const [user, setUser] = useState();

  //All users info
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  //Memmber Info
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  //Trainer info
  const [price, setPrice] = useState('');
  const [specialization, setSpecialization] = useState('');

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/v1/admin/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setRole(res.data.role);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setGender(res.data.gender);
        setEmail(res.data.email);
        setDateStart(res.data.memberData?.membershipStart.split('T')[0]);
        setDateEnd(res.data.memberData?.membershipEnd.split('T')[0]);
        setPrice(res.data.trainerData?.hourlyRate);
        setSpecialization(res.data.trainerData?.specialization);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  async function editUser(createPayload) {

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

  if (!user) return;

  return (
    <UserForm mode="edit"
      user={user}
      firstName={firstName}
      firstNameError={firstNameError}
      setFirstName={setFirstName}
      lastName={lastName}
      lastNameError={lastNameError}
      setLastName={setLastName}
      gender={gender}
      setGender={setGender}
      role={role}
      email={email}
      emailError={emailError}
      setEmail={setEmail}
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
      submitText='Edit User'
      submitFunction={editUser} />
  )
}