package com.bharath.projectmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bharath.projectmanagement.domain.Project;
import com.bharath.projectmanagement.domain.repositories.ProjectRepository;

@Service
public class ProjectService {
	// Dependency injection to interface with the backend.
    @Autowired
	private ProjectRepository projectRepository;
    
    
    // Method to save/update a project.
    public Project saveOrUpdateProject(Project project) {
    	
    	//Very simple enough for now. No validations here. Will be handled in the controller.
    	return projectRepository.save(project);
    }
}
