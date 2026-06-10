import { TrainingForm } from '../trainingForm/TrainingForm';
import { useParams, useOutletContext } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function UpdateTrainingPage() {

  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutTitleError, setWorkoutTitleError] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [notes, setNotes] = useState('');

  const [message, setMessage] = useState('');
  const [messageF, setMessageF] = useState(false);

  const { token } = useOutletContext();
  const { trainingId } = useParams();

  async function handleUpdate(exercises, workoutTitle, notes){

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
      await axios.patch(`/api/v1/member/training/${trainingId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('You succesfully updated training.')

      setTimeout(() => {
        setMessage('');
      }, 3000);

    } catch (error) {
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

      setWorkoutTitle(res.data.title);
      setExercises(res.data.exercises);
      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrainigInfo();
  },[]);

  if(!notes) return;

  return (
    <>
      <TrainingForm workoutTitle={workoutTitle}
        setWorkoutTitle={setWorkoutTitle}
        exercises={exercises}
        setExercises={setExercises}
        notes={notes}
        setNotes={setNotes}
        workoutTitleError={workoutTitleError}
        message={message}
        messageF={messageF}
        onSubmit={handleUpdate}
        submitText="Save Changes" />
    </>
  )
}