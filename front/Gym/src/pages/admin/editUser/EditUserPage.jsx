import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { UserForm } from '../userForm/UserForm.jsx';
import axios from 'axios';

export function EditUserPage() {

  const { token } = useOutletContext();
  const { userId } = useParams();

  const [user, setUser] = useState();

  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    dateStart: '',
    dateEnd: '',
    price: '',
    specialization: ''
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    dateStart: false,
    dateEnd: false,
    price: false,
    specialization: false
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {

    const fetchUser = async () => {
      try {

        const res = await axios.get(`/api/v1/admin/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data);

        setFormData({
          role: res.data.role,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          gender: res.data.gender,
          email: res.data.email,
          dateStart:
            res.data.memberData?.membershipStart?.split('T')[0] || '',
          dateEnd:
            res.data.memberData?.membershipEnd?.split('T')[0] || '',
          price:
            res.data.trainerData?.hourlyRate || '',
          specialization:
            res.data.trainerData?.specialization || ''
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

  }, []);

  async function editUser() {

    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email,
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

      await axios.patch(
        `/api/v1/admin/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

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
    <UserForm
      mode="edit"
      user={user}
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      successMessage={successMessage}
      failureMessage={failureMessage}
      submitText="Edit User"
      submitFunction={editUser}
    />
  );
}