import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function CreateTaskList({ userEmail, callBack }) {

    const [taskListName, setTaskListName] = useState('New Task List');
    
    const handleInput = (e) => {
        setTaskListName(e.target.value);
    }
    const submit = () => {
        fetch("http://localhost:8080/createTaskList",
            {
                method:"POST",
                headers:{
                    "Accept": "application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    userId: userEmail,
                    listName: taskListName
                })
                }).then((res => res.text())
            ).then((data) =>{
                callBack(JSON.parse(data));
                console.log(data)
            });
    };

    return (
        <div>
            {/* Title */}
            <TextField
                required
                id="outlined-required"
                label="Task List Name"
                value={taskListName}
                onChange={handleInput}
              />
            <button onClick={submit}>Create</button>
        </div>
    )
}

export default CreateTaskList