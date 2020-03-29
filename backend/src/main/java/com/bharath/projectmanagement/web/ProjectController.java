package com.bharath.projectmanagement.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bharath.projectmanagement.domain.Project;
import com.bharath.projectmanagement.services.MapValidationErrorService;
import com.bharath.projectmanagement.services.ProjectService;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
  
  @Autowired
  private ProjectService projectService;
  
  @Autowired
  private MapValidationErrorService errorService;
  
  @PostMapping("")
//  Post Request to the Root route defined in the Request Mapping.
 // @Valid will help us to print useful information in the case of a bad request body.
  public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {
	  
	 
	  if (result.hasErrors()) {
		  return errorService.mapValidationService(result);
	  }
	  Project createdProject = projectService.saveOrUpdateProject(project);
	  return new ResponseEntity<Project>(createdProject, HttpStatus.OK);
  }
}
