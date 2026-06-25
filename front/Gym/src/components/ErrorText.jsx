import styles from './ErrorText.module.css';

export function ErrorText({text}){
  return(
    <p className={styles["error-text"]}>{text}</p>
  );
}