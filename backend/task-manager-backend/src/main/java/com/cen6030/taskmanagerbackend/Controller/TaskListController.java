package com.cen6030.taskmanagerbackend.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public String addTask(@RequestBody TaskList taskList) {
        
        List<TaskList> allLists = taskListRepo.findAll();
        for(TaskList x : allLists){
            if(x.getUserId().equals(taskList.getUserId()) && taskList.getListName().equals(x.getListName())){
                return "List Name already used by user";
            }
        }
        taskListRepo.save(taskList);
        return "List added";
    }

    @GetMapping("/findTaskListsByUserId/{userId}")
    public List<TaskList> findTaskListsByUserId(@PathVariable("userId") String userId){
        
        List<TaskList> allLists = taskListRepo.findAll();
        List<TaskList> taskLists = new ArrayList<>();
        
        for(TaskList taskList : allLists){
            if(taskList.getUserId().equals(userId)){
                taskLists.add(taskList);
            }
        }
        return taskLists;
    }

    @GetMapping("/getTaskListId/{userId}/{listName}")
    public String getTaskListId(@PathVariable("userId") String userId, @PathVariable("listName") String listName){
        
        List<TaskList> allLists = taskListRepo.findAll();
        
        for(TaskList taskList : allLists){
            if(taskList.getUserId().equals(userId) && taskList.getListName().equals(listName)){
                return taskList.getId();
            }
        }
        return "";
    }
}

