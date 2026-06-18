import styles from './SuccesMessage.module.css';

export function SuccesMessage({message}){
  return(
    <div className={styles['message']}> {message} </div>
  );
}