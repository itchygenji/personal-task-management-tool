import React from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
function Login() {
  let navigate = useNavigate();

  const handleLogin = (credentialResponseDecoded) => {
    
    navigate('/hello-world', {state: {user: credentialResponseDecoded}});
  };

  return (
    
    <div className="loginPage">

      <header>
        Login Page
      </header>

      <div className='googleButton'>
        <div className='button'>
          <GoogleLogin
          onSuccess={credentialResponse => {

            //Object containing google account data to store in database is passed to main page
            var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
            
            handleLogin(credentialResponseDecoded)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
          theme="filled_black"
          size='large'
          shape='pill'
          />

        </div>
      </div>
    </div>

  );
}

export default Login;
