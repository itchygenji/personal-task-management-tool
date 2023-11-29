
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnHomeButton = ({ user }) => {
  let navigate = useNavigate();

  const handleGoHome = () => {

    navigate('/home', { state: { user } });
  };

  return (
    <button onClick={handleGoHome}>Return Home</button>
  );
}

export default ReturnHomeButton;
