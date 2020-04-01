package com.bharath.projectmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bharath.projectmanagement.domain.Project;
import com.bharath.projectmanagement.exceptions.ProjectIDException;
import com.bharath.projectmanagement.repositories.ProjectRepository;

@Service
public class ProjectService {
	// Dependency injection to interface with the backend.
    @Autowired
	private ProjectRepository projectRepository;
        
    
    // Method to save/update a project.
    public Object saveOrUpdateProject(Project project) {
    	
    	//Very simple enough for now. No validations here. Will be handled in the controller.
    	try {
    	  project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
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
}
