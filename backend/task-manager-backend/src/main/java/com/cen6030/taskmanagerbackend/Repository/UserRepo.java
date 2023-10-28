package com.cen6030.taskmanagerbackend.Repository;

import com.cen6030.taskmanagerbackend.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<User, String>{

    public User findUserByEmail(String email);
}
