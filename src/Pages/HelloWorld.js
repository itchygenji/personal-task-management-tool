import React from 'react';
import { useLocation, useNavigate } from 'react-router';

function HelloWorld(props) {
  
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state.user);

  const handleGoToProfile = () => {
    navigate('/profile');
  }

  const handleGoToDashboard = () => {
      navigate('/dashboard');
  }

  return (
    <div>
      <h1>Hello, {location.state.user.given_name}</h1>
      <p>Welcome to the application!</p>
      <button onClick={handleGoToProfile}>Go to Profile</button>
      <p></p>
      <button onClick={handleGoToDashboard}>Go to Dashboard</button>
    </div>
  );
}

export default HelloWorld;
