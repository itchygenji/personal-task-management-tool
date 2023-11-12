import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import ReturnHomeButton from '../returnHome';

function ProfileView() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state || {};
  const { email, fullName, phoneNum, address, city, state, zipCode } = user;

  // Function to handle the logout process
  const handleLogout = () => {
    // Display confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  
    if (confirmLogout) {
      googleLogout();
      navigate('/login');
    }
  };

  return (
    <div>
      <ReturnHomeButton user={user} />
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <h3>Your Profile</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Name:</strong> {fullName}</p>
      <p><strong>Phone:</strong> {phoneNum}</p>
      <p><strong>Address:</strong> {address}, {city}, {state}, {zipCode}</p>
    </div>
  );
}

export default ProfileView;
