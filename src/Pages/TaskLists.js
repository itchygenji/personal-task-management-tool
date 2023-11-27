import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateTaskList from '../Components/CreateTaskList';
import ReturnHomeButton from '../returnHome';
import { googleLogout } from '@react-oauth/google';
import '../css/TaskList.css'

function TaskLists() {

    const location = useLocation();
    const userEmail = location.state.user.email;
    const user = location.state.user || {};
    const navigate = useNavigate();

    const [taskLists, setTaskLists] = useState([]);
    const [tasks, setTasks] = useState([])
    const [updateTasksView, setUpdateTasksView] = useState(false)
    const [updateListsView, setUpdateListsView] = useState(false)

    // Function to handle the logout process
    const handleLogout = () => {
        // Display confirmation dialog
        const confirmLogout = window.confirm("Are you sure you want to log out?");
    
        if (confirmLogout) {
        googleLogout();
        navigate('/login');
        }
    }
    //Get user's tasks list
    useEffect(() => {
        fetch(`http://localhost:8080/findTaskListsByUserId/${userEmail}`) 
        .then(res => res.json()) 
        .then(data => {
          setTaskLists([...data]);
        }) 
        .catch(error => { 
          console.error(error); 
        })
    }, [userEmail, updateListsView])

    //Get tasks for each task list
    useEffect(() => {
        fetch("http://localhost:8080/findTasksByUserIdForTaskLists/" + userEmail) 
        .then(res => res.json()) 
        .then(data => {
            setTasks([...data]);
        }) 
        .catch(error => { 
          console.error(error); 
        }); 
      }, [userEmail, updateTasksView]);

    const createTaskListCallBack = (data) => {
        const nextTaskLists = [...taskLists];
        nextTaskLists.push(data);
        setTaskLists(nextTaskLists);
    }
    const deleteList = (listId) => {
        
        //delete tasks with list id
        fetch(`http://localhost:8080/deleteTasksFromList/${listId}`, {
            method: 'DELETE'
          })
          .then(() => {
            setUpdateTasksView(!updateTasksView);
          })
          .catch(error => {
            console.error('Error:', error);
          });

        //delete list with id
        fetch(`http://localhost:8080/deleteList/${listId}`, {
            method: 'DELETE'
          })
          .then(() => {
            setUpdateListsView(!updateListsView);
          })
          .catch(error => {
            console.error('Error:', error);
          });  
    }
    const lists = taskLists.map(taskList => {
        return (  
            <div className='task-list'>
                
                <h2>{taskList.listName}:</h2> 
                <button onClick={() =>{deleteList(taskList.id)}}>Delete list</button>  
                <div className='tasks-container'>
                                       
                    {tasks.map((task,index) => (
                        task.listId === taskList.id &&
                            <div className='task'>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>Due date: {task.dueDate}</p>
                                <p>Priority: {task.priority}</p>
                                <p>Category: {task.category}</p>
                            </div>
                    ))}
                    <button>Add Task</button> 
                </div> 
                          
            </div> 
        )
    }) 

    return (

        <div className='task-list-page'>  
            <div className='bannner-buttons'>
                <ReturnHomeButton user={user} />
                <button onClick={handleLogout}>Logout</button>
            </div>

            <CreateTaskList userEmail={location.state.user.email}
                            callBack={createTaskListCallBack} />
            <div className='list-container'>{lists}</div>
        </div>
    )
}


export default TaskLists