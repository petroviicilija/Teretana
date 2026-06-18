import styles from './TrainingForm.module.css';
import { useState } from 'react';
import DeleteButton from '../../../assets/deleteButton.png';
import { BackButton, PrimaryButton } from '../../../components';

export function TrainingForm({workoutTitle, 
  setWorkoutTitle, 
  exercises, 
  setExercises, 
  notes, 
  setNotes, 
  workoutTitleError,
  message,
  messageF, 
  onSubmit,
  submitText}) {

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseNameError, setExerciseNameError] = useState(false);
  const [sets, setSets] = useState('');
  const [setsError, setSetsError] = useState(false);
  const [reps, setReps] = useState('');
  const [repsError, setRepsError] = useState(false);
  const [weight, setWeight] = useState('');

  function addExercise(exercises, name, sets, reps, weight) {

    let hasError = false;

    if (exerciseName === '') {
      setExerciseNameError(true);
      hasError = true;
    } else {
      setExerciseNameError(false);
    }
    if (sets === '') {
      setSetsError(true);
      hasError = true;
    } else {
      setSetsError(false);
    }
    if (reps === '') {
      setRepsError(true);
      hasError = true;
    } else {
      setRepsError(false);
    }

    if (hasError) return;

    const exercise = {
      name,
      sets,
      reps
    };

    if (weight !== '') {
      exercise.weight = weight;
    }

    setExercises(prev => [...prev, exercise]);

    setExerciseName('')
    setReps('');
    setSets('');
    setWeight('');
  }

  return (
    <div className={styles['create-training-page']}>
      <div className={styles['create-training-card']}>
        <div className={styles['header-section']}>
          <h1>Create your training</h1>
          <p>Build a personalized workout plan for your fitness goals.</p>
        </div>

        <div className={styles['workout-title-input']}>
          <h2>Workout title: </h2>
          <input type="text" className={`${workoutTitleError ? styles['input-error'] : ''}`} value={workoutTitle} placeholder="Push Day" onChange={(event) => setWorkoutTitle(event.target.value)} />
          {workoutTitleError && <p className={styles["error-text"]}>Workout title is required</p>}
        </div>

        <div className={styles['exercise-form']}>
          <label>Exercise Name</label>
          <div className={styles['exercise-header']}>
            <input type="text" className={`${exerciseNameError ? styles['input-error'] : ''}`} value={exerciseName} placeholder="Bench Press" onChange={(event) => setExerciseName(event.target.value)} />
            <PrimaryButton buttonText={'Add Exercise'} handleClick={() => addExercise(exercises, exerciseName, sets, reps, weight)} />
          </div>

          {exerciseNameError && <p className={styles["error-text"]}>Exercise Name is required</p>}

          <div className={styles['exercise-details']}>
            <div>
              <label>Sets</label>
              <input type="number" className={`${setsError ? styles['input-error'] : ''}`} value={sets} onChange={(event) => setSets(Number(event.target.value))} />
              {setsError && <p className={styles["error-text"]}>Sets are required</p>}
            </div>
            <div>
              <label>Reps</label>
              <input type="number" className={`${repsError ? styles['input-error'] : ''}`} value={reps} onChange={(event) => setReps(Number(event.target.value))} />
              {setsError && <p className={styles["error-text"]}>Reps are required</p>}
            </div>
            <div>
              <label>Weight (kg)</label>
              <input type="number" value={weight} onChange={(event) => setWeight(Number(event.target.value))} />
            </div>
          </div>
        </div>

        <div className={styles['exercise-list']}>
          {exercises.length !== 0 && exercises.map((exercise, index) => (
            <div key={index} className={styles['exercise-row']}>
              <span className={styles['exercise-number']}>
                {index + 1}
              </span>
              <div className={styles['exercise-info']}>
                <h4>{exercise.name}</h4>
                <p> {exercise.sets} x {exercise.reps} {exercise.weight && ` • ${exercise.weight}kg`} </p>
              </div>
              <img src={DeleteButton} className={styles['delete-button']} onClick={() => setExercises(exercises.filter((_, i) => i !== index))} />
            </div>
          ))}
        </div>

        <div className={styles['notes-section']}>
          <span>Notes</span>
          <textarea placeholder="Add workout notes, instructions, rest times..." value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>

        {(message && messageF) && (<div className={`${styles['message']} ${styles['failure']}`}> {message} </div>)}
        {(message && !messageF) && (<div className={styles['message']}> {message} </div>)}

        <div className={styles['buttons-container']}>
          <BackButton />
          <PrimaryButton buttonText={submitText} handleClick={() => onSubmit(exercises, workoutTitle, notes)} />
        </div>
      </div>
    </div>
  )
}