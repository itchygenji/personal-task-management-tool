import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const [tasks, setTasks] = useState([]); // Initial empty array of tasks
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    const userEmail = location.state.user.email;

    fetch(`http://localhost:8080/findUserByEmail/${userEmail}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((userData) => {
        navigate('/profile-view', { state: userData });
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    // Here you would also send a request to add the task to the backend
  };

  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    // Similarly, send a request to remove the task from the backend
  };

  return (
    <div>
      <h1>Hello, {location.state.user.given_name}</h1>
      <p>Welcome to the application!</p>
      <button onClick={handleGoToProfile}>View Profile</button>

      <div>
        <h2>Your Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task} <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={() => addTask('New Task')}>Add Task</button>
      </div>
    </div>
  );
}

export default Home;
