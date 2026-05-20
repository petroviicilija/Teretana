import { LoginCard } from './LoginCard';
import styles from './LoginPage.module.css';

export function LoginPage() {
  return (
    <div className={styles['login-page']}>
      <LoginCard />
    </div>
  );
}