package com.cen6030.taskmanagerbackend.Controller;

import com.cen6030.taskmanagerbackend.Model.Task;
import com.cen6030.taskmanagerbackend.Model.User;
import com.cen6030.taskmanagerbackend.Repository.TaskRepo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class TaskController {
    
    @Autowired
    private TaskRepo taskRepo;

    @PostMapping("/addTask")
    public Task addTask(@RequestBody Task task) {
        // Save the task to the database using the TaskRepo object
        taskRepo.save(task);
        // Return the task as a response
        return task;
    }

     
    @GetMapping("/findTasksByUserId/{userId}")
    public List<Task> findTasksByUserId(@PathVariable("userId") String userId){
        List<Task> test = taskRepo.findAll();
        List<Task> tasks = new ArrayList<Task>();

        for(Task task : test){
            if(task.getUserId().equals(userId)){
                tasks.add(task);
            }
        }
        return tasks;
        

    }
 
}
