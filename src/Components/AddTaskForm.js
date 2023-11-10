import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function AddTaskForm({ title, description, dueDate, priority, category, setTitle, setDescription, setDueDate, setPriority, setCategory }) {
    return(
        <div className="add-task">
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Title"
                defaultValue=""
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <br/>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <br/>
              <TextField 
                id="outlined-basic" 
                label="Date Due" 
                variant="outlined" 
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
              <br/>
              <TextField 
                id="outlined-basic" 
                label="Priority" 
                variant="outlined" 
                value={priority}
                onChange={e => setPriority(e.target.value)}
              />
              <br/>
              <TextField 
                id="outlined-basic" 
                label="Category" 
                variant="outlined" 
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
              
            </Box>
        </div>
    )
}

export default AddTaskForm