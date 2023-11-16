import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateTaskList from '../Components/CreateTaskList';

function TaskLists() {
    const location = useLocation();
    const userEmail = location.state.userEmail;
    const [taskLists, setTaskLists] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/findTaskListsByUserId/${userEmail}`) 
        .then(res => res.json()) 
        .then(data => {
          setTaskLists([...data]);
        }) 
        .catch(error => { 
          console.error(error); 
        }); 
      }, [userEmail]);
    const createTaskListCallBack = (data) => {
        const nextTaskLists = [...taskLists];
        nextTaskLists.push(data);
        setTaskLists(nextTaskLists);
    }
    const links = taskLists.map(taskList => {
        return (
            <TaskListLink key={taskList.id}
                          listName={taskList.listName}
                          listId={taskList.id} />
        );
    });

    return (
        <div>
            <CreateTaskList userEmail={location.state.userEmail}
                            callBack={createTaskListCallBack} />
            <ol>{links}</ol>
        </div>
    );
}

function TaskListLink({ listName, listId}) {
    const navigate = useNavigate();
    const handleOnClick = () => {
            navigate(`/view-task-list`, {state: {listId: listId}})
        }
        return (
            <li>
                <a onClick={handleOnClick}>{listName}</a>
            </li>
        );
}
export default TaskLists