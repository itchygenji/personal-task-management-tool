import React from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
function Login() {
  let navigate = useNavigate();

  const handleLogin = (credentialResponseDecoded) => {
    
    
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

            
            var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
            console.log(credentialResponse)

            //address for Tomcat Server
            fetch("http://localhost:8080/addUser",{
              method:"POST",
              headers:{
              "Accept": "application/json",
              "Content-Type":"application/json"},
              body: JSON.stringify({
              email:credentialResponseDecoded.email,
              fullName:credentialResponseDecoded.name 
            })
            }).then((res => res.text())
            ).then((data) =>{
              console.log(data)
              if(data === "Added User"){
                //ask user more info to create profile
              }
              else if(data === "User already Added"){
                //go directly to task dashboard
                //handleLogin(credentialResponseDecoded)
                navigate('/home', {state: {user: credentialResponseDecoded}});
              }
              else
                console.log('login error')
            })


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