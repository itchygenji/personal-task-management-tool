package com.cen6030.taskmanagerbackend.Model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Task {

    @Id
    private String id; // Identifier field

    private String title;
    private String description;
    private String dueDate;
    private String priority;
    private String category;
    private String dateCreated;
    private String userId;
    private Boolean isCompleted;
    //empty string if not in any lists, else this field is the id of the list that contains it
    private String listId; 

    public Task() {
    }

    public Task(String title, String description, String dueDate, String priority, String category, String userId, String listId) {
        
        LocalDateTime localDate = LocalDateTime.now();
        DateTimeFormatter dateformatter = DateTimeFormatter.ofPattern("MM/dd/YYYY");

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
        this.dateCreated = dateformatter.format(localDate);
        this.userId = userId;
        this.listId = listId;
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getListId(){
        return listId;
    }
    public void setListId(String listId){
        this.listId = listId;
    }
    public Boolean getIsCompleted(){
        return isCompleted;
    }
    public void setIsCompleted(Boolean isCompleted){
        this.isCompleted = isCompleted;
    }

    @Override
    public String toString() {
        return "Task{" +
               "id='" + id + '\'' +
               ", title='" + title + '\'' +
               ", description='" + description + '\'' +
               ", dueDate='" + dueDate + '\'' +
               ", priority='" + priority + '\'' +
               ", category='" + category + '\'' +
               ", dateCreated='" + dateCreated + '\'' +
               ", userId='" + userId + '\'' +
               '}';
    }
}
