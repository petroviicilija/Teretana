import Logo from '../../assets/ThunderGym.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './LoginPage.css';

export function LoginPage() {
  const [emailText, setEmailText] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordText, setPasswordText] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  function saveInputEmail(event) {
    setEmailText(event.target.value);
  }

  function saveInputPassword(event) {
    setPasswordText(event.target.value);
  }

  async function submitLoginInfo() {

    let hasError = false;

    if (emailText === '') {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }
    if (passwordText === '') {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) return;

    try {
      const res = await axios.post('/api/v1/login', {
        email: emailText,
        password: passwordText
      });

      const { user, token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      const roleRoutes = {
        admin: '/admin',
        trainer: '/trainer',
        member: '/member'
      };

      navigate(roleRoutes[user.role]);

    } catch (error) {
      console.log(error);
    }

    setEmailText('');
    setPasswordText('');
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={Logo} className="logo" />

        <h1>Welcome Back</h1>
        <p className="subtitle">Enter your credentials</p>

        <input
          type="text"
          placeholder="Email"
          className={`email-input ${emailError ? 'input-error' : ''}`}
          onChange={saveInputEmail}
        />

        {emailError && <p className="error-text">Email is required</p>}

        <input
          type="password"
          placeholder="Password"
          className={`password-input ${passwordError ? 'input-error' : ''}`}
          onChange={saveInputPassword}
        />

        {passwordError && <p className="error-text">Password is required</p>}

        <button
          className="login-button"
          onClick={submitLoginInfo}
        >
          Login
        </button>
      </div>
    </div>
  );
}