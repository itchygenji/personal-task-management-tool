
import React, { useState, useEffect } from 'react';
import '../css/Home.css'
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const [tasks, setTasks] = useState([]); // Initial empty array of tasks
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state.user.email;
  const userEmail = location.state.user.email;


  useEffect(() => { 

    // load tasks from database 
    fetch(`http://localhost:8080/findTasksByUserId/${userId}`) 
    .then(res => res.json()) 
    .then(data => { 

      // update tasks state with the fetched tasks 
      setTasks(data);
      console.log("fetched tasks...tasks are", data) }) 
      .catch(error => { 
        console.error(error); 
      }); 
    }, 
    []); 

  const handleGoToProfile = () => {

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

    // prompt the user to enter the task details
    let title = prompt("Enter the task title");
    let description = prompt("Enter the task description");
    let dueDate = prompt("Enter the task due date");
    let priority = prompt("Enter the task priority");
    let category = prompt("Enter the task category");

    // create an object with the task data
    let taskData = {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        category: category,
        userId: userEmail
    };

    console.log("new task created with taskData: ", taskData)

    // send the data to the backend 
    fetch(`http://localhost:8080/addTask`, {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json());
    console.log("task sent to backend with taskData ", taskData)


};

  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    // Similarly, send a request to remove the task from the backend
  };

  return (
    <div className='home'>
      <h1>Hello, {location.state.user.given_name}</h1>
      <p>Welcome to the application!</p>
      <button onClick={handleGoToProfile}>View Profile</button>

      <div>
        <h2>Your Tasks</h2>
        <ul>
            {Array.isArray(tasks) && tasks.map((task, index) => (
              <li key={index}>
                <div className="task">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due date: {task.dueDate}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Category: {task.category}</p>
                </div>
                <button onClick={() => removeTask(index)}>Remove</button>
              </li>
            ))}
        </ul>
        <button onClick={() => addTask('New Task')}>Add Task</button>
      </div>
    </div>
  );
}

export default Home;
