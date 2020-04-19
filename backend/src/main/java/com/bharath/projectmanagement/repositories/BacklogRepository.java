package com.bharath.projectmanagement.repositories;

import javax.persistence.Entity;

import org.springframework.data.repository.CrudRepository;

import com.bharath.projectmanagement.domain.Backlog;

@Entity
public interface BacklogRepository extends CrudRepository<Backlog, Long> {

}
