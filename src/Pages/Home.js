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
  const [updateTasksView, setUpdateTasksView] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state.user.email;

  useEffect(() => {
    fetch("http://localhost:8080/findTasksByUserId/" + userEmail) 
    .then(res => res.json()) 
    .then(data => {
      setTasks([...data])
    }) 
    .catch(error => { 
      console.error(error); 
    }); 
  }, [updateTasksView, userEmail]);

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
    // validate title before confirming the task
    const titleRegex = /.{1,}/;
    const titleError = "Error: Title is required.";
    if (!titleRegex.test(title)) {
      alert(titleError);
      return;
    }

    let taskData = {
      title: title,
      description: description,
      dueDate: dueDate.format('MM/DD/YYYY'),
      priority: priority,
      category: category,
      userId: userEmail
    };
    fetch(`http://localhost:8080/addTask`, {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
      res.json();
      setShowTaskForm(false);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("");
      setCategory("");
      setUpdateTasksView(!updateTasksView);
    });
  };

  const cancelAddTask = () => {
    setShowTaskForm(false);
    // Reset the states related to the task form
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
    setCategory("");
  };

  const addTask = () => {
    setShowTaskForm(true);
  };

  const removeTask = (taskId) => {
    fetch(`http://localhost:8080/deleteTask/${taskId}`, {
        method: 'DELETE'
    })
    .then(() => {
      setUpdateTasksView(!updateTasksView); // Refresh the tasks list
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const handleLogout = () => {
    // Display confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  
    if (confirmLogout) {
      googleLogout();
      navigate('/login');
    }
  };

  return (
    <div className='home'>
      <h1>Hello, {location.state.user.given_name}</h1>
      <p>Welcome to the application!</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGoToProfile}>View Profile</button>
      <h2>Your Tasks</h2>
      <button onClick={addTask}>Add Task</button>
      {showTaskForm &&    
        <div>  
          <AddTaskForm 
            title={title} setTitle={setTitle}
            description={description} setDescription={setDescription}
            dueDate={dueDate} setDueDate={setDueDate}
            priority={priority} setPriority={setPriority}
            category={category} setCategory={setCategory}
            onCancel={cancelAddTask}
          />
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <button onClick={confirmTask} style={{ marginRight: '10px' }}>Create</button>
            <button onClick={cancelAddTask}>Cancel</button>
          </div>
        </div>
      }
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <div className='task-button-group' key={task.id || index}>
            <div className="task">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>
            </div>
            {/* Edit button placeholder */}
            <button className='edit-button'>Edit</button>
            {/* Delete button with task.id passed to removeTask */}
            <button className='remove-button' onClick={() => removeTask(task.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
