import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { UserForm } from '../userForm/UserForm.jsx';
import axios from 'axios';

export function AdminCreate() {

  const { token } = useOutletContext();

  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const [formData, setFormData] = useState({
    role: 'member',
    firstName: '',
    lastName: '',
    gender: 'man',
    email: '',
    password: '',
    dateStart: '',
    dateEnd: '',
    price: '',
    specialization: ''
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    dateStart: false,
    dateEnd: false,
    price: false,
    specialization: false
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function createUser() {

    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email,
      password: !formData.password,
      dateStart:
        formData.role === 'member' && !formData.dateStart,
      dateEnd:
        formData.role === 'member' && !formData.dateEnd,
      specialization:
        formData.role === 'trainer' && !formData.specialization,
      price:
        formData.role === 'trainer' &&
        (!formData.price || formData.price <= 0)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      gender: formData.gender,
      ...(formData.role === 'member' && {
        memberData: {
          membershipStart: formData.dateStart,
          membershipEnd: formData.dateEnd
        }
      }),
      ...(formData.role === 'trainer' && {
        trainerData: {
          specialization: formData.specialization,
          hourlyRate: formData.price
        }
      })
    };

    try {
      await axios.post('/api/v1/admin', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccessMessage('New user successfully created!');

      setFormData({
        role: 'member',
        firstName: '',
        lastName: '',
        gender: 'man',
        email: '',
        password: '',
        dateStart: '',
        dateEnd: '',
        price: '',
        specialization: ''
      });

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
    <UserForm
      mode="create"
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      successMessage={successMessage}
      failureMessage={failureMessage}
      submitText="Create User"
      submitFunction={createUser}
    />
  );
}