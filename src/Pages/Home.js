import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import AddTaskForm from '../Components/AddTaskForm';
import EditTaskForm from '../Components/EditTaskFrom';

function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [updateTasksView, setUpdateTasksView] = useState(false);
  const [editMode, setEditMode] = useState(false)
  const [editedTask, setEditedTask] = useState({})
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = location.state.user.email;
  const userName = location.state.user.given_name;

  useEffect(() => {
    fetch("http://localhost:8080/findTasksByUserId/" + userEmail) 
    .then(res => res.json()) 
    .then(data => {
      setTasks([...data]);
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
        userData.given_name = location.state.user.given_name;
        navigate('/profile-view', { state: userData });
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };
  const handleGoToTaskLists = () => {
    navigate('/task-lists', {state: {userEmail: location.state.user.email}})
  }

  const confirmTask = () => {
    const titleRegex = /.{1,}/;
    const titleError = "Error: Title is required.";
    if (!titleRegex.test(title)) {
      alert(titleError);
      return;
    }

    let taskData = {
      title: title,
      description: description,
      priority: priority,
      category: category,
      userId: userEmail
    };

    let defaultDate = '01/01/2099';
    try {
      taskData.dueDate = dueDate.format('MM/DD/YYYY');
    } catch (error) {
      taskData.dueDate = defaultDate;
    }
    
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
  }

  const cancelAddTask = () => {
    setShowTaskForm(false);
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
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
  
    if (isConfirmed) {
      fetch(`http://localhost:8080/deleteTask/${taskId}`, {
        method: 'DELETE'
      })
      .then(() => {
        setUpdateTasksView(!updateTasksView);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };
  
  const editTask = (task) => {
    setEditMode(true);
    setEditedTask(task);
  }

  const saveEditedTask = () => {
    const updatedTask = {
      id: editedTask.id,
      title,
      description,
      dueDate: dueDate.format('MM/DD/YYYY'),
      priority,
      category,
      userId: userEmail
    };
  
    fetch(`http://localhost:8080/updateTask`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setEditMode(false);
      setUpdateTasksView(!updateTasksView);
    })
    .catch(error => console.error('Error:', error));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  
    if (confirmLogout) {
      googleLogout();
      navigate('/login');
    }
  };

  return (
    <div className='home'>
      <div className='banner'>
        <h1>Hello, {userName}</h1>
        <div className='banner-buttons'>
          <button className='view-profile-button' onClick={handleGoToProfile}>View Profile</button>
          <button className='view-task-lists-button' onClick={handleGoToTaskLists}>View Task Lists</button>
          <button className='logout-button' onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className='tasks-container-header'>
        <h2>Your Tasks</h2>
        {!showTaskForm &&
          <button className='add-task-button' onClick={addTask}>Add Task</button>
        }
      </div>  
      {showTaskForm &&    
        <div className='create-task-form'>  
          <AddTaskForm 
            title={title} setTitle={setTitle}
            description={description} setDescription={setDescription}
            dueDate={dueDate} setDueDate={setDueDate}
            priority={priority} setPriority={setPriority}
            category={category} setCategory={setCategory}
            onCancel={cancelAddTask}
            confirmTask={confirmTask}
            cancelAddTask={cancelAddTask}
          />
          <div className='task-form-buttons'>
            <button className='create-button' onClick={confirmTask}>Create</button>
            <button className='task-button' onClick={cancelAddTask}>Cancel</button>
          </div>
        </div>
      }
      <div className="tasks-container">
        {tasks.length === 0 &&
          <p className='empty-tasks-p'>No tasks created yet.</p>
        }
        {tasks.map((task, index) => (
          <div className='task-button-group' key={task.id || index}>
            <div className="task">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>
            </div>
            <div className='edit-remove-buttons'>
              <button className='edit-button' onClick={() => editTask(task)}>Edit</button>
              <button className='remove-button' onClick={() => removeTask(task.id)}>Remove</button>
            </div>
          </div>
        ))}
        {editMode &&
          <div className='edit-task-form'>
            Edit Task
            <EditTaskForm 
              title={editedTask.title} setTitle={setTitle}
              description={editedTask.description} setDescription={setDescription}
              dueDate={editedTask.dueDate} setDueDate={setDueDate}
              priority={editedTask.priority} setPriority={setPriority}
              category={editedTask.category} setCategory={setCategory}
            />
            <button onClick={saveEditedTask}>Save</button> {/* Updated line */}
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;

