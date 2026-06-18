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

  const navItems = {
    admin: [
      { label: 'Dashboard', path: '/admin' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Create User', path: '/admin/createUser' }
    ],
    member: [
      { label: 'Dashboard', path: '/member' },
      { label: 'My Profile', path: '/member/profile' },
      { label: 'My Trainings', path: '/member/trainings' }
    ]
  };

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
        {navItems[user.role]?.map(item => (
          <button key={item.path} onClick={() => navigate(item.path)}>
            {item.label}
          </button>
        ))}
        <button onClick={logOut}>Log Out</button>
      </div>
      <img src={Logo} className={styles['logo-img']} />
    </nav>
  );
}