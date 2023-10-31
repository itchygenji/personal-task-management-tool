import React from 'react';
import { useLocation } from 'react-router-dom';

function ProfileView() {
  const location = useLocation();
  const user = location.state || {};

  // Note: Destructure the user object carefully depending on the actual structure of the user data
  const { email, fullName, phoneNum, address, city, state, zipCode } = user;

  return (
    <div>
      <h3>Your Profile</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Name:</strong> {fullName}</p>
      <p><strong>Phone:</strong> {phoneNum}</p>
      <p><strong>Address:</strong> {address}, {city}, {state}, {zipCode}</p>
    </div>
  );
}

export default ProfileView;
