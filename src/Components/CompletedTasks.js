import React, { useState, useEffect } from 'react';


function CompletedTasks({ userEmail, updateTasksView}){

    const[tasks, setTasks] = useState([])


    useEffect(() => {
        fetch("http://localhost:8080/findCompletedTasksByUserId/" + userEmail) 
        .then(res => res.json()) 
        .then(data => {
          setTasks([...data]);
        }) 
        .catch(error => { 
          console.error(error); 
        }); 
      }, [userEmail, updateTasksView]);
    return(
        <>
        <h2 className='completed-header'>Completed Tasks: </h2>
        <div className="completed-tasks-container">
            {tasks.length === 0 &&
                <p className='empty-tasks-p'>No tasks completed yet.</p>
            }
            {tasks.map((task, index) => (
            <div className='task-button-group' key={task.id || index}>
                <div className="task">

                <div className='task-text'>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Due date: {task.dueDate}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Category: {task.category}</p>
                </div>
                </div>

            </div>
            ))}
        </div>
        </>
    )
}

export default CompletedTasks