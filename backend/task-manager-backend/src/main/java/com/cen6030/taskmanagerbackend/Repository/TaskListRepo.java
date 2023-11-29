package com.cen6030.taskmanagerbackend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cen6030.taskmanagerbackend.Model.TaskList;

@Repository
public interface TaskListRepo extends MongoRepository<TaskList, String> {
}
