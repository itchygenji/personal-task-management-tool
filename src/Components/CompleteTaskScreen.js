
function CompleteTaskScreen({task, setShowComplete, updateTasksView, setUpdateTasksView}){

    const completeTask = (task) => {
        fetch(`http://localhost:8080/completeTask`, {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setShowComplete("")
          setUpdateTasksView(!updateTasksView);
        })    
      }

    return(

            <div className='confirm-complete-task'>
              <div className='complete-task-buttons'>
                <p><b>Complete Task?</b></p>
                <button className='complete-task-button' onClick={() => {completeTask(task)}}>✓</button>
                <button className='cancel-task-button' onClick={()=> {setShowComplete("")}}>X</button>
              </div>
            </div>
        

    )
}

export default CompleteTaskScreen