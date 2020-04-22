package com.bharath.projectmanagement.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bharath.projectmanagement.domain.ProjectTask;
import com.bharath.projectmanagement.services.MapValidationErrorService;
import com.bharath.projectmanagement.services.ProjectTaskService;

@RestController
@CrossOrigin
@RequestMapping("/api/backlog")
public class ProjectTaskController {
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	  private MapValidationErrorService errorService;
	
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addProjectTaskToBacklog
	(
	  @Valid @RequestBody ProjectTask task,
	  BindingResult result,
	  @PathVariable String backlog_id			  
	){
		
		// Handle Exceptions 
		if (result.hasErrors()) {
			  return errorService.mapValidationService(result);
		  }
		
		ProjectTask projectTaskDB = projectTaskService.addProjectTask(backlog_id, task);
		
		return new ResponseEntity<ProjectTask>(projectTaskDB, HttpStatus.OK);
	}
	

}
