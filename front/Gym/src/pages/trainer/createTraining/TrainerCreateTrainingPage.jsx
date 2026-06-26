import { TrainingForm } from '../../trainingForm/TrainingForm';
import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import axios from 'axios';

export function TrainerCreateTrainingPage() {

  const [formData, setFormData] = useState({
    workoutTitle: '',
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
  const { memberId } = useParams();

  async function createTraining(exercises, workoutTitle, notes) {

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
      exercises
    }

    if (notes !== '') {
      payload.notes = notes;
    }

    try {
      await axios.post(`/api/v1/trainer/trainings/${memberId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccessMessage('You succesfully made training.')
      setFormData({
        workoutTitle: '',
        exercises: [],
        notes: ''
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
    <TrainingForm 
      trainingFormTitle={'Create Client Workouts'}
      trainingFormSubtitle={'Build tailored training plans to help your clients reach their goals.'} 
      formData={formData}
      handleChange={handleChange}
      setFormData={setFormData}
      workoutTitleError={workoutTitleError}
      successMessage={successMessage}
      failureMessage={failureMessage}
      onSubmit={createTraining}
      submitText="Create Training" />
  );
}