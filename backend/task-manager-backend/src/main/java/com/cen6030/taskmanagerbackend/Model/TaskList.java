package com.cen6030.taskmanagerbackend.Model;

import org.springframework.data.annotation.Id;

public class TaskList {
    @Id
    private String id;
    private String userId;
    private String listName;


    public TaskList() {
    }

    public TaskList(String userId, String listName) {
        this.userId = userId;
        this.listName = listName;
    }

    public String getId() {
        return this.id;
    }
    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getListName() {
        return this.listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }   
}
