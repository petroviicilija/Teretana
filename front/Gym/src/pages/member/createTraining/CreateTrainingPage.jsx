import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { TrainingForm } from '../../trainingForm/TrainingForm';
import axios from 'axios';

export function CreateTrainingPage() {

  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutTitleError, setWorkoutTitleError] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [notes, setNotes] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const { token } = useOutletContext();

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
      await axios.post('/api/v1/member/training', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccessMessage('You succesfully made training.')
      setWorkoutTitle('');
      setExercises([]);
      setNotes('');

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
    <TrainingForm trainingFromTitle={'Create your training'}
      trainingFromSubtitle={'Build a personalized workout plan for your fitness goals.'}
      workoutTitle={workoutTitle}
      setWorkoutTitle={setWorkoutTitle}
      exercises={exercises}
      setExercises={setExercises}
      notes={notes}
      setNotes={setNotes}
      workoutTitleError={workoutTitleError}
      successMessage={successMessage}
      failureMessage={failureMessage}
      onSubmit={createTraining}
      submitText="Create Training" />
  );
}