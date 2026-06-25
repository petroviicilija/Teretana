import { TrainingForm } from '../../trainingForm/TrainingForm';
import { useParams, useOutletContext } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function TrainerUpdateTrainigPage() {

  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutTitleError, setWorkoutTitleError] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [notes, setNotes] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const { token } = useOutletContext();
  const { trainingId, memberId } = useParams();

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
      await axios.patch(`/api/v1/trainer/trainings/${memberId}/${trainingId}`, payload, {
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
      const res = await axios.get(`/api/v1/trainer/trainings/${memberId}/${trainingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setWorkoutTitle(res.data.title);
      setNotes(res.data.notes);
      setExercises(res.data.exercises);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrainigInfo();
  }, []);

  if (!exercises) return;

  return (
    <>
      <TrainingForm trainingFromTitle={'Update Client Workouts'}
        trainingFromSubtitle={'Build tailored training plans to help your clients reach their goals.'}
        workoutTitle={workoutTitle}
        setWorkoutTitle={setWorkoutTitle}
        exercises={exercises}
        setExercises={setExercises}
        notes={notes}
        setNotes={setNotes}
        workoutTitleError={workoutTitleError}
        successMessage={successMessage}
        failureMessage={failureMessage}
        onSubmit={handleUpdate}
        submitText="Save Changes" />
    </>
  )
}