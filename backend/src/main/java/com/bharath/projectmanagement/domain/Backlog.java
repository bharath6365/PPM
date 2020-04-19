package com.bharath.projectmanagement.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Backlog {
	
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  // Explanation in Project Task.
  private int PTSEQUENCE = 0;
  
  private String projectIdentifier;
  
  // OneToOne Mapping with Project
  
  // OneToMay Mapping with Project Tasks
  
  public Backlog() {
	  
  }

// Getters and setters.
public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public int getPTSEQUENCE() {
	return PTSEQUENCE;
}

public void setPTSEQUENCE(int pTSEQUENCE) {
	PTSEQUENCE = pTSEQUENCE;
}

public String getProjectIdentifier() {
	return projectIdentifier;
}

public void setProjectIdentifier(String projectIdentifier) {
	this.projectIdentifier = projectIdentifier;
}
  
  
}
