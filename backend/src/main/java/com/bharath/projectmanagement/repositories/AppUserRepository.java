package com.bharath.projectmanagement.repositories;

import org.springframework.data.repository.CrudRepository;

import com.bharath.projectmanagement.domain.AppUser;

public interface AppUserRepository extends CrudRepository<AppUser, Long> {

}
