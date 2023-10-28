package com.cen6030.taskmanagerbackend.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {

    @Id
    private String email;
    @Indexed
    private String fullName;

    //phone, address, city ,state
    public User(){

    }

    public User(String fullName, String email) {

        this.fullName = fullName;
        this.email = email;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}