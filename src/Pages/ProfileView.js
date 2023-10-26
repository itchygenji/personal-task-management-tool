import React from 'react';

function ProfileView(props) {
   
    const { firstName, lastName, phoneNumber, streetAddress, city, state, zipCode } = props.location.state;

    return (
        <div>
            <h3>Your Profile</h3>
            <p><strong>Name:</strong> {firstName} {lastName}</p>
            <p><strong>Phone:</strong> {phoneNumber}</p>
            <p><strong>Address:</strong> {streetAddress}, {city}, {state}, {zipCode}</p>
        </div>
    );
}

export default ProfileView;
