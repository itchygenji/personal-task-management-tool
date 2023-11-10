import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date Due" 
                  value={dueDate}
                  onChange={e => setDueDate(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
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