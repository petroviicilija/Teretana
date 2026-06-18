import styles from './FailureMessage.module.css';

export function FailureMessage({message}){
  return(
    <div className={styles['message']}> {message} </div>
  );
}