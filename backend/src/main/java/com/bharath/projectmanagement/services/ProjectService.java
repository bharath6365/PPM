package com.bharath.projectmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bharath.projectmanagement.domain.Backlog;
import com.bharath.projectmanagement.domain.Project;
import com.bharath.projectmanagement.exceptions.ProjectIDException;
import com.bharath.projectmanagement.repositories.BacklogRepository;
import com.bharath.projectmanagement.repositories.ProjectRepository;

@Service
public class ProjectService {
	// Dependency injection to interface with the backend.
    @Autowired
	private ProjectRepository projectRepository;
    
    @Autowired
    private BacklogRepository backlogRepository;
    
    // Method to save/update a project.
    public Object saveOrUpdateProject(Project project) {
    	
    	//Very simple enough for now. No validations here. Will be handled in the controller.
    	try {
    	  project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
    	  
    	  // We need to create a backlog now when creating a project. Remember for save methods
    	  // there won't be any id passed on.
    	  
    	  if (project.getId() == null) {
    		  Backlog backlog = new Backlog();
    		  project.setBacklog(backlog);
    		  backlog.setProject(project);
    		  backlog.setProjectIdentifier(project.getProjectIdentifier());
    	  } else {
    		  // This is an update operation. Backlog will not be passed from the frontend.
    		  // Find it first
    		  String projectIdentifer = project.getProjectIdentifier();
    		  Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifer);
    		  
    		  // Todo: Refactor to a function
    		  project.setBacklog(backlog);
    		  backlog.setProject(project);
    		  backlog.setProjectIdentifier(project.getProjectIdentifier());
    	  }
    	  return projectRepository.save(project);
		} catch (Exception e) {
			
			if (e.getMessage().contains("project_identifier")) {
				throw new ProjectIDException(
				  project.getProjectIdentifier().toUpperCase() + " already exists"
				);
			}
			
			return null;
			
		}
    	
    }
    
    // Method to find a project by identifier.
    public Project findProjectByIndetifier(String projectIdentifier) {
    	
//    	Handle NULL Pointer Exception. Reuse our Custom Exception.
    	
    	Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
    	
    	if (project == null) {
    		throw new ProjectIDException(
  				  "Project with identifer - " + projectIdentifier +  " does not exist."
  			);	
    	} else {
    		return project;
    	}
    	 
    }
    
    
    
    // Find all Projects. If there are no projects empty response is sent from the API.
    public Iterable<Project> findAllProjects() {
    	return projectRepository.findAll();
    }
    
    
 // Method to delete a project by identifier.
    public void deleteProjectByIndetifier(String projectIdentifier) {
    	
//    	Handle NULL Pointer Exception. Reuse our Custom Exception.
    	
    	Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
    	
    	if (project == null) {
    		throw new ProjectIDException(
  				  "Project with identifer - " + projectIdentifier +  " does not exist."
  			);	
    	} else {
    		projectRepository.delete(project);
    	}
    	 
    }
    
}
