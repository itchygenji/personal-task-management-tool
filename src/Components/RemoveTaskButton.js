



function RemoveTaskButton({taskId, updateTasksView, setUpdateTasksView, setShowComplete}) {
    
    const removeTask = () => {

        const isConfirmed = window.confirm("Are you sure you want to delete this task?");
      
        if (isConfirmed) {
          fetch(`http://localhost:8080/deleteTask/${taskId}`, {
            method: 'DELETE'
          })
          .then(() => {
            setUpdateTasksView(!updateTasksView);
            setShowComplete("")
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
      };


    return(

        <button className='remove-button' onClick={() => removeTask()}>Remove</button>
    )

}

export default RemoveTaskButton