import styles from './NavBar.module.css';
import Avatar from '../assets/gym-guy.jpg';
import Logo from '../assets/whiteThundergym.png';
import { useNavigate } from 'react-router';

export function NavBar({user}) {

  const navigate = useNavigate();

  function allMembers(){
    navigate('members');
  }

  function DashBoard(){
    navigate('/admin')
  }

  return (
    <nav className={styles['nav-bar']} >
      <img src={Avatar} className={styles['avatar-img']} />
      <div className={styles['simple-text']}>
        Welcome back {user.name}
      </div>
      <button onClick={allMembers}>Members</button>
      <button onClick={DashBoard}>DashBoard</button>
      <img src={Logo} className={styles['logo-img']} />
    </nav>
  );
}