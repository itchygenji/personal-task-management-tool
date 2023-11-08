package com.cen6030.taskmanagerbackend.Repository;

import com.cen6030.taskmanagerbackend.Model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends MongoRepository<Task, String>{

    
}
