import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';


function CreateProfile(props) {
    
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state.user)

    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const handlePhoneNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        if (value.length > 3 && value.length <= 6)
            value = `${value.slice(0, 3)}-${value.slice(3)}`;
        else if (value.length > 6)
            value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;

        setPhoneNumber(value);
    };

    const handleZipCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); 
        if (value.length > 5) {
            return; 
        }
        setZipCode(value);
    };

    //const navigate = useNavigate();

    const US_STATES = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];
    

    const createProfile = () => {
        //add new info to DB

        fetch("http://localhost:8080/addUser",{
              method:"POST",
              headers:{
              "Accept": "application/json",
              "Content-Type":"application/json"},
              body: JSON.stringify({
              email:location.state.user.email,
              fullName:location.state.user.name,
              phoneNum:phoneNumber,
              address:streetAddress,
              city:city,
              state:state,
              zipCode:zipCode
            })
            }).then((res => res.text())
            ).then((data) =>{
              console.log(data)
              if(data === "Added User"){
                navigate('/home', {state: {user: location.state.user}});
              }
              else
                console.log('error saving user')
            })
    }

    return (
        <div>
            <h2>Create Your Profile</h2>
            
            {/* Phone Number Block */}
            <div>
                <h3>Phone Number</h3>
                <input
                    type="text"
                    placeholder="(000)-000-0000"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    maxLength="12"
                />
            </div>
            
            {/* Address Block */}
            <div>
                <h3>Address</h3>
                <input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                {/* State Dropdown */}
                <select value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">Select State</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input
                    type="text"
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    maxLength="5"
                />
            </div>

            {/* Create Profile Button */}
            <div>
                <button onClick={createProfile}>Create Profile</button>
            </div>

            {/* Display Profile if created */}
{/*             {showProfile && (
                <div>
                    <h3>Your Profile</h3>
                    <p><strong>Name:</strong> {firstName + ' '} {lastName}</p>
                    <p><strong>Phone:</strong> {phoneNumber}</p>
                    <p><strong>Address:</strong> {streetAddress}, {city}, {state}, {zipCode}</p>
                </div>
            )} */}
        </div>
    );
}

export default CreateProfile;
