import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect} from 'react';


function EditListInput({taskList, setShowEditListInput, updateListsView, setUpdateListsView}) {
    
    const [newListName, setNewListName] = useState('')

    const saveListName = ()=> {
        let updatedList = {
            id: taskList.id,
            userId: taskList.userId,
            listName: newListName,
        }

        fetch(`http://localhost:8080/updateList`, {
            method: 'PUT',
            body: JSON.stringify(updatedList),
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setShowEditListInput(false)
            setUpdateListsView(!updateListsView)
          })
          .catch(error => console.error('Error:', error));
        
    }

    return (
        <div className='edit-list-input'>
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
               <TextField
                label="List Name"
                defaultValue={taskList.listName}
                onChange={e => setNewListName(e.target.value)}
              />     

                
            </Box>
            <button onClick={saveListName}>Save</button>
        </div>
    )

}

export default EditListInput