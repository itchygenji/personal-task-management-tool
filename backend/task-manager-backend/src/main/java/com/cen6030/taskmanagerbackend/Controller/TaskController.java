package com.cen6030.taskmanagerbackend.Controller;

import com.cen6030.taskmanagerbackend.Model.Task;
import com.cen6030.taskmanagerbackend.Repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class TaskController {
    
    @Autowired
    private TaskRepo taskRepo;

    @PostMapping("/addTask")
    public Task addTask(@RequestBody Task task) {
        System.out.println("Received task for addition: " + task); // Debug log
        try {
            taskRepo.save(task);
            return task;
        } catch (Exception e) {
            System.err.println("Error while adding task: " + e.getMessage()); // Error log
            // Handle or rethrow the exception as per your application's needs
            return null; // or handle this case as required
        }
    }

    @GetMapping("/findTasksByUserId/{userId}")
    public List<Task> findTasksByUserId(@PathVariable("userId") String userId){
        List<Task> test = taskRepo.findAll();
        List<Task> tasks = new ArrayList<>();

        for(Task task : test){
            if(task.getUserId().equals(userId)){
                tasks.add(task);
            }
        }
        return tasks;
    }

    @DeleteMapping("/deleteTask/{taskId}")
    public void deleteTask(@PathVariable("taskId") String taskId) {
        taskRepo.deleteById(taskId);
    }

    @PutMapping("/updateTask")
    public Task updateTask(@RequestBody Task task) {
        return taskRepo.save(task); // This will update the task if it exists
    }
}
