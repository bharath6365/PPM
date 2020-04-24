package com.bharath.projectmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bharath.projectmanagement.domain.Backlog;
import com.bharath.projectmanagement.domain.ProjectTask;
import com.bharath.projectmanagement.repositories.BacklogRepository;
import com.bharath.projectmanagement.repositories.ProjectTaskRepository;

import antlr.collections.List;

@Service
public class ProjectTaskService {
	
@Autowired
private BacklogRepository backlogRepository;

@Autowired
private ProjectTaskRepository projectTaskRepository;
 
public Iterable<ProjectTask> findAllTasks(String id) {
	
	return projectTaskRepository.findByProjectIdentifier(id);
}

 public ProjectTask addProjectTask(String projectIdentifer, ProjectTask projectTask) {
	 // Find the backlog based on the projectIdentifer.
	 // TODO: Handle Exception when project ain't found.
	 Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifer);
	 
	 
	 // Associate projecttask with the backlog.
	 projectTask.setBacklog(backlog);
	 
	 // Get the project sequence integer
	 int sequenceInteger = backlog.getPTSEQUENCE();
	 ++sequenceInteger;
	 backlog.setPTSEQUENCE(backlog.getPTSEQUENCE() + 1);
	 
	 // Get the String version
	 String sequence = projectIdentifer + "-" + sequenceInteger;
	 
	 // Set the sequence to the project task.
	 projectTask.setProjectSeqeunce(sequence);
	 
	 // Add the project identifier to the project task
	 
	 projectTask.setProjectIdentifier(projectIdentifer);
	 
	 return projectTaskRepository.save(projectTask);
 }
}
