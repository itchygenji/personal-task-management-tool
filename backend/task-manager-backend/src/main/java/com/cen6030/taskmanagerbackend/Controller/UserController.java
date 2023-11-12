package com.cen6030.taskmanagerbackend.Controller;

import com.cen6030.taskmanagerbackend.Model.User;
import com.cen6030.taskmanagerbackend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    @GetMapping("/findUserByEmail/{email}")
    public Optional<User> findUserByEmail(@PathVariable("email") String email){
        return repo.findById(email);
    }

    @PutMapping("/editUser/{email}")
    public String editUser(@PathVariable("email") String email, @RequestBody User user) {
        
        // check if the user exists 
        Optional<User> existingUser = repo.findById(email);
        if (existingUser.isPresent()) {

            // update the user information
            User updatedUser = existingUser.get();

            updatedUser.setFullName(user.getFullName());
            updatedUser.setPhoneNum(user.getPhoneNum());
            updatedUser.setAddress(user.getAddress());
            updatedUser.setCity(user.getCity());
            updatedUser.setState(user.getState());
            updatedUser.setZipCode(user.getZipCode());

            repo.save(updatedUser); 
            return "Successfully edited user! User is now: " + updatedUser.getFullName() + " and should be " + user.getFullName();
        } else {
            return "User not found.";
        }
    }


}



