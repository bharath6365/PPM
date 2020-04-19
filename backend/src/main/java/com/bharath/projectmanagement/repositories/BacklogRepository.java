package com.bharath.projectmanagement.repositories;

import javax.persistence.Entity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bharath.projectmanagement.domain.Backlog;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {

}
