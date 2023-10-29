import React from 'react';
import { useLocation, useNavigate } from 'react-router';

function Home(props) {
  
  const location = useLocation();
  const navigate = useNavigate();

  

  const handleGoToProfile = () => {
    //navigate('/create-profile');
  }

  return (
    <div>
      <h1>Hello, {location.state.user.given_name}</h1>
      <p>Welcome to the application!</p>
      <button onClick={handleGoToProfile}>View Profile</button>
    </div>
  );
}

export default Home;
