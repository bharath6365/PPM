package com.bharath.projectmanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bharath.projectmanagement.domain.Project;

// Will be consumed by a project service.
@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
	
	// Find by Identifer. THE REAL POWER OF SPRING BOOT. We are including this function because
	// default is findById (Primary Key)
	// This name should match private String projectIdentifier in Entity.
	Project findByProjectIdentifier(String projectID);
	
    Project deleteByProjectIdentifier(String projectID);
}
