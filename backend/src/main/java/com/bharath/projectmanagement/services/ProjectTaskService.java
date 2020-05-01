package com.bharath.projectmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bharath.projectmanagement.domain.Backlog;
import com.bharath.projectmanagement.domain.ProjectTask;
import com.bharath.projectmanagement.exceptions.ProjectIdentifierNotFoundException;
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
	
	return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
}

 public Object addProjectTask(String projectIdentifier, ProjectTask projectTask) {
	 // Find the backlog based on the projectIdentifer.
	 Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
	 
	 if (backlog == null) {
		 throw new ProjectIdentifierNotFoundException("Project Identifier not found");
		
	 }
	 
	 
	 // Associate projecttask with the backlog.
	 projectTask.setBacklog(backlog);
	 
	 // Get the project sequence integer
	 int sequenceInteger = backlog.getPTSEQUENCE();
	 ++sequenceInteger;
	 backlog.setPTSEQUENCE(backlog.getPTSEQUENCE() + 1);
	 
	 // Get the String version
	 String sequence = projectIdentifier + "-" + sequenceInteger;
	 
	 // Set the sequence to the project task.
	 projectTask.setProjectSeqeunce(sequence);
	 
	 // Add the project identifier to the project task
	 
	 projectTask.setProjectIdentifier(projectIdentifier);
	 
	 return projectTaskRepository.save(projectTask);
 }

public Object getTask(String projectSequence, String projectIdentifier) {
	// First check is to see if the backlog exists.
	
	Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
	 
	 if (backlog == null) {
		 throw new ProjectIdentifierNotFoundException("Project Identifier not found");
		
	 }
	
	
	ProjectTask task = projectTaskRepository.findByProjectSeqeunce(projectSequence);
	
	if (task == null) {
		throw new ProjectIdentifierNotFoundException("Project Sequence not found");
	}
	
	
	return task;
}

public ProjectTask updateTask(ProjectTask incomingTask, String projectIdentifier) {
	// Make sure that incoming project Identifier exists.
	// Reusing get task function due to repetitive logic.
	String projectSequence = incomingTask.getProjectSeqeunce();
	
	ProjectTask task = (ProjectTask) getTask(projectSequence, projectIdentifier);

	
	if (task == null) {
	  throw new ProjectIdentifierNotFoundException("Task Sequence Incorrect");
	}
	task = incomingTask;
	
	return projectTaskRepository.save(task);
	
}

public void deleteTask(String projectIdentifier, String projectSequence) {
	ProjectTask task = (ProjectTask) getTask(projectSequence, projectIdentifier);
	
	projectTaskRepository.delete(task);
}

}
