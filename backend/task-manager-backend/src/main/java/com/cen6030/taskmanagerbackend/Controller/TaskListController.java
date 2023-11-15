package com.cen6030.taskmanagerbackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cen6030.taskmanagerbackend.Model.TaskList;
import com.cen6030.taskmanagerbackend.Repository.TaskListRepo;

@RestController
@CrossOrigin
public class TaskListController {
    @Autowired
    private TaskListRepo taskListRepo;
      
        
    @PostMapping("/createTaskList")
    public TaskList addTask(@RequestBody TaskList taskList) {
        return taskListRepo.save(taskList);
    }
}

