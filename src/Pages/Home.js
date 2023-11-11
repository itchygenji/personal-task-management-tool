import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google'; 
import AddTaskForm from '../Components/AddTaskForm';

function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state.user.email;

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

  const confirmTask = () => {
    let taskData = {
      title: title,
      description: description,
      dueDate: dueDate.format('MM/DD/YYYY'),
      priority: priority,
      category: category,
      userId: userEmail
    }
    console.log("new task created with taskData: ", taskData);

    fetch(`http://localhost:8080/addTask`, {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
      res.json();
      console.log("task sent to backend with taskData ", taskData);

      setTasks([...tasks, taskData]);

      setShowTaskForm(false);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("");
      setCategory("");
    })
  };

  const addTask = (newTask) => {
    setShowTaskForm(true);
  };

  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  
  const handleLogout = () => {
    googleLogout(); 
    navigate('/login');
  };

  return (
    <div className='home'>
      <h1>Hello, {location.state.user.given_name}</h1>
      <p>Welcome to the application!</p>

      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGoToProfile}>View Profile</button>

      <div className="tasks-container">
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
        
        { showTaskForm &&    
          <div>  
            <AddTaskForm 
              title={title} setTitle={setTitle}
              description={description} setDescription={setDescription}
              dueDate={dueDate} setDueDate={setDueDate}
              priority={priority} setPriority={setPriority}
              category={category} setCategory={setCategory}
            />
            <button onClick={() => confirmTask()}>Create</button>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
