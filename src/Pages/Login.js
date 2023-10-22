import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();

  const handleLogin = () => {
    // Here, you'd typically validate the user's login details.
    // For this example, we'll assume login is always successful.
    navigate('/hello-world');
  };

  return (
    <div className="loginPage">
      <header>
        Login Page
      </header>
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
