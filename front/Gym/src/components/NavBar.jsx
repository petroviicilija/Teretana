import styles from './NavBar.module.css';
import Avatar from '../assets/gym-guy.jpg';
import GirlAvatar from '../assets/gym-girl.jpg';
import Logo from '../assets/whiteThundergym.png';
import { useNavigate } from 'react-router';

export function NavBar({ user, collapsed, setCollapsed }) {

  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');
  }

  return (
    <nav className={`${styles['nav-bar']} ${collapsed ? styles['collapsed'] : ''}`} >
      <button className={styles['menu-btn']} onClick={() => setCollapsed(!collapsed)}>
        ☰
      </button>
      {user.gender === 'man' ? <img src={Avatar} className={styles['avatar-img']} /> : <img src={GirlAvatar} className={styles['avatar-img']} />}
      {!collapsed && (
        <div className={styles['simple-text']}>
          Welcome back <span>{user.name}</span>
        </div>
      )}
      <div className={styles['nav-links']}>
        {user.role === 'admin' &&
          <>
            <button onClick={() => navigate('/admin')}>DashBoard</button>
            <button onClick={() => navigate('users')}>Users</button>
            <button onClick={() => navigate('createUser')} >Create User</button>
          </>
        }
        {user.role === 'member' &&
          <>
            <button onClick={() => navigate(`/member/`)}>DashBoard</button>
            <button onClick={() => navigate(`profile`)}>My Profile</button>
            <button onClick={() => navigate('trainings')} >My Trainings</button>
          </>
        }
        <button onClick={logOut}>Log Out</button>
      </div>
      <img src={Logo} className={styles['logo-img']} />
    </nav>
  );
}