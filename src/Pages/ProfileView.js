
import React from 'react';
import { useLocation } from 'react-router-dom';
import ReturnHomeButton from '../returnHome'; 

function ProfileView() {
  const location = useLocation();
  const user = location.state || {}; 
  const { email, fullName, phoneNum, address, city, state, zipCode } = user;

  return (
    <div>
      <ReturnHomeButton user={user} /> {/* Pass the user data to ReturnHomeButton */}
      <h3>Your Profile</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Name:</strong> {fullName}</p>
      <p><strong>Phone:</strong> {phoneNum}</p>
      <p><strong>Address:</strong> {address}, {city}, {state}, {zipCode}</p>
    </div>
  );
}

export default ProfileView;
