import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

function EditTaskForm({ title, description, dueDate, priority, category, setTitle, setDescription, 
    setDueDate, setPriority, setCategory, onCancel, confirmTask, cancelAddTask}) {

        


  return (
        <div >
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
              {/* Title */}
              <TextField
                required
                id="outlined-required"
                label="Title"
                defaultValue={title}
                onChange={e => setTitle(e.target.value)}
              />
              <br/>
              {/* Description */}
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                defaultValue={description}
                rows={4}
                onChange={e => setDescription(e.target.value)}
              />
              <br/>
              {/* Date Picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date Due"
                  onChange={e => setDueDate(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <br/>
              {/* Priority */}
              <Box sx={{ minWidth: 120, marginLeft: 1}}>
                  <InputLabel id="priority-select-label">Priority</InputLabel>
                  <Select
                    labelId="priority-select-label"
                    id="priority-select"
                    label="Priority"
                    defaultValue={priority}
                    onChange={e => setPriority(e.target.value)}
                  >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                  </Select>
              </Box>
              <br/>
              {/* Category */}
              <Box sx={{ minWidth: 120 , marginLeft: 1}}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  defaultValue={category}
                  label="Category"
                  onChange={e => setCategory(e.target.value)}
                >
                  <MenuItem value={"Professional"}>Professional</MenuItem>
                  <MenuItem value={"Academic"}>Academic</MenuItem>
                  <MenuItem value={"Leisure"}>Leisure</MenuItem>
                </Select>
              </Box>
            </Box>

        </div>
    )
}

export default EditTaskForm;
