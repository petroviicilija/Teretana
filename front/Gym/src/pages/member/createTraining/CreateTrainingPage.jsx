import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { TrainingForm } from '../trainingForm/TrainingForm';
import axios from 'axios';

export function CreateTrainingPage() {

  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutTitleError, setWorkoutTitleError] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [notes, setNotes] = useState('');

  const [message, setMessage] = useState('');
  const [messageF, setMessageF] = useState(false);

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

      setMessage('You dont have any exercises!')
      setMessageF(true);
      setTimeout(() => {
        setMessage('');
        setMessageF(false);
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

      setMessage('You succesfully made training.')
      setWorkoutTitle('');
      setExercises([]);
      setNotes('');

      setTimeout(() => {
        setMessage('');
      }, 3000);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TrainingForm workoutTitle={workoutTitle}
        setWorkoutTitle={setWorkoutTitle}
        exercises={exercises}
        setExercises={setExercises}
        notes={notes}
        setNotes={setNotes}
        workoutTitleError={workoutTitleError}
        message={message}
        messageF={messageF}
        onSubmit={createTraining}
        submitText="Create Training" />
  );
}