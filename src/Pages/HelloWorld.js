import React from 'react';
import { useLocation } from 'react-router';


function HelloWorld(props) {

  //location.stat.user is object with account info from google login
  const location = useLocation()
  console.log(location.state.user)

  return (
    <div>
      <h1>Hello, {location.state.user.given_name}</h1>
      <p>Welcome to the application!</p>
    </div>
  );
}

export default HelloWorld;