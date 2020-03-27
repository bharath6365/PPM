package com.bharath.projectmanagement.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bharath.projectmanagement.domain.Project;
import com.bharath.projectmanagement.services.ProjectService;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
  
  @Autowired
  private ProjectService projectService;
  
  @PostMapping("")
//  Post Request to the Root route defined in the Request Mapping.
  public ResponseEntity<?> createNewProject(@RequestBody Project project) {
	  Project createdProject = projectService.saveOrUpdateProject(project);
	  return new ResponseEntity<Project>(createdProject, HttpStatus.OK);
  }
}
