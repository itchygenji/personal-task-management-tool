package com.cen6030.taskmanagerbackend.Controller;

import com.cen6030.taskmanagerbackend.Model.User;
import com.cen6030.taskmanagerbackend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepo repo;

    @PostMapping("/addUser")
    public String saveUser(@RequestBody User user){

        if(repo.findById(user.getEmail()).isPresent()){
            return "User already Added";
        }
        repo.save(user);
        return "Added User";
    }
    @GetMapping("/findUserByEmail")
    public Optional<User> findUserByEmail(@RequestBody String email){
        return repo.findById(email);

    }

}



