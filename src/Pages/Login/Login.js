import React from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
function Login() {
  let navigate = useNavigate();

  return (
    
    <div className="loginPage">

      <header>
        Login Page
      </header>

      <div className='googleButton'>
        <div className='button'>
          <GoogleLogin
          onSuccess={credentialResponse => {

           
            var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
            console.log(credentialResponse)

            fetch("http://localhost:8080/findUserByEmail/" + credentialResponseDecoded.email,{
              method:"GET",
              headers:{
              "Accept": "application/json",
              "Content-Type":"text/plain"}
            }).then((res => res.text())
            ).then((data) =>{
              if(data !== "null"){
                //go directly to task dashboard
                console.log("user already added")
                navigate('/home', {state: {user: credentialResponseDecoded}});

              }
              else{
                //ask user more info to create profile
                console.log("new user")
                navigate('/create-profile', {state: {user: credentialResponseDecoded}});
              }

            })
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