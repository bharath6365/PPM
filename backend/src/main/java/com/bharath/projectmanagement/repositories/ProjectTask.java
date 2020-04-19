package com.bharath.projectmanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
// This tells Spring boot that the base object is that of a project task and the id is of type long.
public interface ProjectTask extends CrudRepository<ProjectTask, Long> {

}
