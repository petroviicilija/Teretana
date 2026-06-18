import styles from './NotFoundPage.module.css';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../components/PrimaryButton';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles['not-found-page']}>
      <div className={styles['not-found-card']}>

        <div className={styles['error-code']}>
          404
        </div>

        <h1>Page Not Found</h1>

        <p>
          The page you are looking for doesn't exist
          or has been moved.
        </p>

        <PrimaryButton buttonText={'Go Back'} handleClick={() => navigate(-1)}/>

      </div>
    </div>
  );
}