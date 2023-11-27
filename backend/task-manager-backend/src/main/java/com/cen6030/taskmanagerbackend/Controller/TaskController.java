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
        System.out.println("TEST: " + task); // Debug log
        try {
            task.setIsCompleted(false);
            taskRepo.save(task);
            return task;
        } catch (Exception e) {
            System.err.println("Error while adding task: " + e.getMessage()); // Error log
            // Handle or rethrow the exception as per your application's needs
            return null; // or handle this case as required
        }
    }

    //UNCOMPLETED TASKS
    @GetMapping("/findTasksByUserId/{userId}")
    public List<Task> findTasksByUserId(@PathVariable("userId") String userId){
        List<Task> test = taskRepo.findAll();
        List<Task> tasks = new ArrayList<>();

        for(Task task : test){
           
            if(task.getUserId() != null && task.getUserId().equals(userId) && !task.getIsCompleted()){
                tasks.add(task);
            }
        }
        return tasks;
    }

    //COMPLETED TASKS
    @GetMapping("/findCompletedTasksByUserId/{userId}")
    public List<Task> findCompletedTasksByUserId(@PathVariable("userId") String userId){
        List<Task> test = taskRepo.findAll();
        List<Task> tasks = new ArrayList<>();

        for(Task task : test){
           
            if(task.getUserId() != null && task.getUserId().equals(userId) && task.getIsCompleted()){
                tasks.add(task);
            }
        }
        return tasks;
    }

    @GetMapping("/findTasksByUserIdForTaskLists/{userId}")
    public List<Task> findTasksByUserIdForTaskLists(@PathVariable("userId") String userId){
        List<Task> test = taskRepo.findAll();
        List<Task> tasks = new ArrayList<>();

        for(Task task : test){
           
            if(task.getUserId().equals(userId) && !task.getListId().equals("")){
                tasks.add(task);
            }
        }
        return tasks;
    }

    @DeleteMapping("/deleteTask/{taskId}")
    public void deleteTask(@PathVariable("taskId") String taskId) {
        taskRepo.deleteById(taskId);
    }
    @DeleteMapping("/deleteTasksFromList/{listId}")
    public void deleteTasksFromList(@PathVariable("listId") String listId) {
        List<Task> allTasks = taskRepo.findAll();

        for(Task task : allTasks){
            if(task.getListId().equals(listId)){
                taskRepo.deleteById(task.getId());
            }
        }
    }

    @PutMapping("/updateTask")
    public Task updateTask(@RequestBody Task task) {
        task.setIsCompleted(false);
        return taskRepo.save(task); // This will update the task if it exists
    }

    @PostMapping("/completeTask")
    public Task completeTask(@RequestBody Task task) {
        task.setIsCompleted(true);
        taskRepo.save(task);
        return task;
    }

}
