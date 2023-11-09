package com.cen6030.taskmanagerbackend.Model;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Task {

    
    private String title;
    private String description;
    private String dueDate;
    private String priority;
    private String category;
    private String dateCreated;
    private String userId;

    public Task() {
    }

    public Task(String title, String description, String dueDate, String priority, String category) {
        
        LocalDateTime localDate = LocalDateTime.now();
        DateTimeFormatter dateformatter = DateTimeFormatter.ofPattern("MM/dd/YYYY");
    
        
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
        this.dateCreated = dateformatter.format(localDate);
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String  getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(String  dueDate) {
        this.dueDate = dueDate;
    }

    public String getPriority() {
        return this.priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public String getDateCreated(){
        return this.dateCreated;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getUserId(){
        return this.userId;
    }
}
