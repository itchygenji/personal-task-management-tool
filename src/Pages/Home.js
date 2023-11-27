import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import AddTaskForm from '../Components/AddTaskForm';
import EditTaskForm from '../Components/EditTaskForm';
import CompletedTasks from '../Components/CompletedTasks';
import RemoveTaskButton from '../Components/RemoveTaskButton';
import CompleteTaskScreen from '../Components/CompleteTaskScreen';

function Home(props) {

  const date = new Date()

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
  const [showComplete, setShowComplete] = useState("")
  const [currentDate, setCurrentDate] = useState((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())
  const [chosenTaskList, setChosenTaskList] = useState({})
  const [taskLists, setTaskLists] = useState([])
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = location.state.user.email;
  const userName = location.state.user.given_name;

  useEffect(() => {
    setTitle(editedTask.title)
    setDescription(editedTask.description)
    setDueDate(editedTask.dueDate)
    setPriority(editedTask.priority)
    setCategory(editedTask.category)
  },[editedTask])

  //Get all tasks the user has
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

  //get users task lists
  useEffect(() => {
    fetch(`http://localhost:8080/findTaskListsByUserId/${userEmail}`) 
    .then(res => res.json()) 
    .then(data => {
      setTaskLists([...data]);
    }) 
    .catch(error => { 
      console.error(error); 
    })
}, [userEmail])

  //get user's profile info
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
    navigate('/task-lists', {state: {user: location.state.user}})
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
      userId: userEmail,
      listId: ''
    };

    let defaultDate = '01/01/2099';
    try {
    
      taskData.dueDate = dueDate.format('MM/DD/YYYY');
   
    } catch (error) {
      taskData.dueDate = defaultDate;
    }
    //if user wants to add task to a certain task list, then get listid from listname and userid and add listid to task
    if(chosenTaskList !== ''){
      
      fetch(`http://localhost:8080/getTaskListId/${userEmail}/${chosenTaskList}`) 
      .then(res => res.text()) 
      .then(data => {
        taskData.listId = data

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
          clearTaskState()
          setUpdateTasksView(!updateTasksView);
        })
      }) 
    }
    else{
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
        clearTaskState()
        setUpdateTasksView(!updateTasksView);
      })
    }
  }


  const clearTaskState = () =>{
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
    setCategory("");
    setChosenTaskList("")
  }
  const cancelAddTask = () => {
    setShowTaskForm(false);
    clearTaskState()
  };

  const addTask = () => {
    clearTaskState()
    setShowTaskForm(true)
  };
  
  const editTask = (task) => {
    setEditMode(true);
    setEditedTask(task);
  }

  const saveEditedTask = () => {
    const updatedTask = {
      id: editedTask.id,
      title: title,
      description : description,
      priority: priority,
      category: category,
      userId: userEmail
    };
    try {
      updatedTask.dueDate = dueDate.format('MM/DD/YYYY');
    } catch (error) {
      updatedTask.dueDate = dueDate;
    }
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
      clearTaskState()
      setEditedTask({})
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
  const handleCompleteTaskClick = (taskId) => {
    if(showComplete === "")
      setShowComplete(taskId)  
  }

  //returns true if due date is not paste current date
  function dueDateCheck(dueD, curD){   
    //[0] = month, [1] = day, [2] = year 
    const dueSplit = dueD.split('/')
    const currSplit = curD.split('/')
    if(Number(dueSplit[2]) <= Number(currSplit[2])){
      if(Number(dueSplit[0]) <= Number(currSplit[0])){
        if(Number(dueSplit[1]) < Number(currSplit[1])){
          return true
        }
        else{
          return false
        }
      }
      else{
        return false
      }
    }
    else{
      return false
    }
  }

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
            chosenTaskList={chosenTaskList} setChosenTaskList={setChosenTaskList}
            onCancel={cancelAddTask}
            confirmTask={confirmTask}
            cancelAddTask={cancelAddTask}
            taskLists={taskLists}
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
            <div className="task" onClick={() => handleCompleteTaskClick(task.id)} style={{ backgroundColor : dueDateCheck(task.dueDate, currentDate) ? 'red' : '#685c85'}}>
              {task.id === showComplete &&
                <CompleteTaskScreen task={task} setShowComplete={setShowComplete}
                                    updateTasksView={updateTasksView} setUpdateTasksView={setUpdateTasksView}
                />
              }
              <div className='task-text'>
                {dueDateCheck(task.dueDate, currentDate) &&
                  <>
                  PAST DUE
                  </>
                }
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Due date: {task.dueDate}</p>
                <p>Priority: {task.priority}</p>
                <p>Category: {task.category}</p>
              </div>
            </div>
            <div className='edit-remove-buttons'>
              <button className='edit-button' onClick={() => editTask(task)}>Edit</button>
              <RemoveTaskButton taskId={task.id} updateTasksView={updateTasksView} 
                                setUpdateTasksView={setUpdateTasksView} setShowComplete={setShowComplete}
              />

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
            <button onClick={() => {
              setEditMode(false)
              clearTaskState()
              }
            }>Cancel</button>
          </div>
        }
       
      </div>

      <CompletedTasks userEmail={userEmail} updateTasksView={updateTasksView}/>
    </div>
  );
}

export default Home;

