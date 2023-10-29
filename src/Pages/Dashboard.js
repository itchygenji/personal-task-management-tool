import React from 'react';
import { useLocation, useNavigate } from 'react-router';

function Dashboard(props) {

    const location = useLocation();
    const navigate = useNavigate();

    //console.log(location.state.user);

    return (
        <div>
            <h1>Welcome to the Task Dashboard.</h1>
        </div>
    );
}

export default Dashboard;
