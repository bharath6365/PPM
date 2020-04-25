package com.bharath.projectmanagement.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bharath.projectmanagement.domain.ProjectTask;
import com.bharath.projectmanagement.services.MapValidationErrorService;
import com.bharath.projectmanagement.services.ProjectTaskService;

import antlr.collections.List;

@RestController
@CrossOrigin
@RequestMapping("/api/backlog")
public class ProjectTaskController {
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	  private MapValidationErrorService errorService;
	
	@PostMapping("/{projectIdentifier}")
	public ResponseEntity<?> addProjectTaskToBacklog
	(
	  @Valid @RequestBody ProjectTask task,
	  BindingResult result,
	  @PathVariable String projectIdentifier			  
	){
		
		// Handle Exceptions 
		if (result.hasErrors()) {
			  return errorService.mapValidationService(result);
		  }
		
		Object projectTaskDB = projectTaskService.addProjectTask(projectIdentifier, task);
		
		return new ResponseEntity<Object>(projectTaskDB, HttpStatus.OK);
	}
	
	@GetMapping("/{projectIdentifier}")
	public Iterable<ProjectTask> getAllTasks(@PathVariable String projectIdentifier) {
		return projectTaskService.findAllTasks(projectIdentifier);
	}
	

}
