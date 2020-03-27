package com.bharath.projectmanagement.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;

@Entity
public class Project {

	// Unique identifier
	@Id
//	Tells hibernate to auto increment the ID.
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	// Tells JPA to reject this if project name is not filled.
    @NotBlank(message="Project name is required.")
	private String projectName;

	// Custom identifier for users. Will be dispayed on task names to link it to a
	// project. ID doens't make sense.
    @NotBlank(message="Project Identifier is required.")
	private String projectIdentifier;

	private String projectDescription;

	private Date start_date;

	private Date end_date;

	private Date created_At;

	private Date updated_At;

	// Whenever we create a new object. Assign that to created_At
	@PrePersist
	protected void onCreate() {
		this.created_At = new Date();
	}

	// Whenever we update the project. Update updated_At
	@PreUpdate
	protected void onUpdate() {
		this.updated_At = new Date();
	}

	public Project() {

	}

	// Getters and Setters.

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectIdentifier() {
		return projectIdentifier;
	}

	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}

	public Date getStart_date() {
		return start_date;
	}

	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}

	public Date getEnd_date() {
		return end_date;
	}

	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}

}
