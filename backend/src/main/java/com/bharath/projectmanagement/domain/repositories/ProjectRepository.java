package com.bharath.projectmanagement.domain.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bharath.projectmanagement.domain.Project;

// Will be consumed by a project service.
@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

}
