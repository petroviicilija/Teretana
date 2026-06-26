import { TrainingForm } from '../../trainingForm/TrainingForm';
import { useParams, useOutletContext } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function UpdateTrainingPage() {

  const [formData, setFormData] = useState({
    workoutTitle:'',
    exercises: [],
    notes: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const [workoutTitleError, setWorkoutTitleError] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const { token } = useOutletContext();
  const { trainingId } = useParams();
  const [loading, setLoading] = useState(true);

  async function handleUpdate(exercises, workoutTitle, notes) {

    let hasError = false;

    if (workoutTitle === '') {
      setWorkoutTitleError(true);
      hasError = true;
    } else {
      setWorkoutTitleError(false);
    }
    if (exercises.length === 0) {
      hasError = true;

      setFailureMessage('You dont have any exercises!')
      setTimeout(() => {
        setFailureMessage('');
      }, 3000);
    }

    if (hasError) return;

    const payload = {
      title: workoutTitle,
      exercises,
      notes
    }

    try {
      await axios.patch(`/api/v1/member/training/${trainingId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccessMessage('You succesfully updated training.')

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

  async function getTrainigInfo() {
    try {
      const res = await axios.get(`/api/v1/member/training/${trainingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFormData({
        workoutTitle: res.data.title,
        exercises: res.data.exercises,
        notes: res.data.notes
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrainigInfo();
  }, []);

  if (loading) return;

  return (
    <>
      <TrainingForm
        trainingFormTitle={'Update your training'}
        trainingFormSubtitle={'Build a personalized workout plan for your fitness goals.'}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        workoutTitleError={workoutTitleError}
        successMessage={successMessage}
        failureMessage={failureMessage}
        onSubmit={handleUpdate}
        submitText="Save Changes" />
    </>
  )
}