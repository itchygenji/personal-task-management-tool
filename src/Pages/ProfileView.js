import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import ReturnHomeButton from '../returnHome';

function ProfileView() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state || {};
  const { email, fullName, phoneNum, address, city, state, zipCode } = user;
  
  const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  // Function to handle the logout process
  const handleLogout = () => {
    // Display confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  
    if (confirmLogout) {
      googleLogout();
      navigate('/login');
    }
  };

  // make new variables for editable fields
  const [newFullName, setFullName] = useState(fullName);
  const [newPhoneNum, setPhoneNum] = useState(phoneNum);
  const [newAddress, setAddress] = useState(address);
  const [newCity, setCity] = useState(city);
  const [newState, setState] = useState(state);
  const [newZipCode, setZipCode] = useState(zipCode);

  // track the editing mode
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async () => {

    // if the user is in editing mode, save the changes to MongoDB
    if (isEditing) {
      try {

        const res = await fetch(`http://localhost:8080/editUser/${email}`, {
          method: 'PUT',
          body: JSON.stringify({
            email:user.email,
            fullName:newFullName,
            phoneNum:newPhoneNum,
            address:newAddress,
            city:newCity,
            state:newState,
            zipCode:newZipCode
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {

          let text = await res.text();
          console.log(text)

          user.fullName = newFullName;
          user.phoneNum = newPhoneNum;
          user.address = newAddress;
          user.city = newCity;
          user.state = newState;
          user.zipCode = newZipCode;
        } else {
          throw new Error("Error from PUT: ", res.statusText);
        }
      } catch (error) {
        alert(error);
      }
    }

    // toggle the editing mode
    setIsEditing(!isEditing);
  };
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const handlePhoneNumChange = (event) => {
    setPhoneNum(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
  };
  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  return (
    <div>
      <ReturnHomeButton user={user} />
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button> {/* Edit/Save button */}
      <h3>Your Profile</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Name:</strong>  {isEditing ? <input type="text" defaultValue={fullName} onChange={handleFullNameChange} placeholder='Full Name'/> : fullName}</p>
      <p><strong>Phone:</strong> {isEditing ? <input type="text" defaultValue={phoneNum} onChange={handlePhoneNumChange} placeholder='Phone Number' maxLength="12"/> : phoneNum}</p>
      <p><strong>Address:</strong> {isEditing ? <><input type="text" defaultValue={address} onChange={handleAddressChange} placeholder='Street Address'/>, 
                                                  <input type="text" defaultValue={city} onChange={handleCityChange} placeholder='City'/>, 
                                                  {/* State Dropdown */}
                                                  <select defaultValue={state} onChange={handleStateChange} placeholder='State Abbreviation'>
                                                      <option value="">Select State</option>
                                                      {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                                  </select>
                                                  <input type="text" defaultValue={zipCode} onChange={handleZipCodeChange} placeholder='Zip Code' maxLength="5"/>
                                                  </> : `${address}, ${city}, ${state}, ${zipCode}`}</p>
    </div>
  );
}

export default ProfileView;
