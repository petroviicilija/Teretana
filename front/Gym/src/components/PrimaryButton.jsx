import styles from './PrimaryButton.module.css';

export function PrimaryButton({buttonText, handleClick}) {
  return (
    <button className={styles['primary-btn']} onClick={handleClick}>
      {buttonText}
    </button>
  );
}