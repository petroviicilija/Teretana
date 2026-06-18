import styles from './BackButton.module.css';
import { useNavigate } from 'react-router';

export function BackButton() {

  const navigate = useNavigate();

  return (
    <button className={styles['back-btn']} onClick={() => navigate(-1)}>Back</button>
  );
}