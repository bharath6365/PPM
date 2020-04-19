package com.bharath.projectmanagement.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class ProjectTask {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	/* Every project task will have its own id in the database. But when we display it to the
	 * user we wanna make sure we show the project identifier + the count from the backlog.
	 * 
	 *  For example we have a project with identifier XFVW. The first task created under it would 
	 *  have the sequence XFVW1 and the next sequence will be XFVW2. That's why we have the PTSEQUENCE
	 *  in the Backlog table. This will be set automatically. User shouldn't change this.
	*/
	
	@Column(updatable = false)
	private String projectSeqeunce; 
	
	@NotBlank(message = "Task Summary is required")
	private String summary;
	
	// The current status of the project
	private String status;
	
	// Tasks will be grouped based on priority.
	private Integer priority;
	
	// Many to one with Backlogs.
	
	@Column(updatable = false)
	private String projectIdentifer;
	
	// Due date for the project
	private Date dueDate;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date created_At;
	
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date updated_At;
	
	@PrePersist
	protected void onCreate() {
		this.created_At = new Date();
	}
	
	// Whenever we update the project. Update updated_At
	@PreUpdate
	protected void onUpdate() {
	this.updated_At = new Date();
	}
	
	// Without no arg constructors there are issues with few versions of spring
    public ProjectTask() {
    	
    }
    
    // Getters and Setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProjectSeqeunce() {
		return projectSeqeunce;
	}

	public void setProjectSeqeunce(String projectSeqeunce) {
		this.projectSeqeunce = projectSeqeunce;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public String getProjectIdentifer() {
		return projectIdentifer;
	}

	public void setProjectIdentifer(String projectIdentifer) {
		this.projectIdentifer = projectIdentifer;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Date getCreated_At() {
		return created_At;
	}

	public void setCreated_At(Date created_At) {
		this.created_At = created_At;
	}

	public Date getUpdated_At() {
		return updated_At;
	}

	public void setUpdated_At(Date updated_At) {
		this.updated_At = updated_At;
	}

	
	
	// <!-- End Getters and Setters --> //
	@Override
	public String toString() {
		return "ProjectTask [id=" + id + ", projectSeqeunce=" + projectSeqeunce + ", summary=" + summary + ", status="
				+ status + ", priority=" + priority + ", projectIdentifer=" + projectIdentifer + ", dueDate=" + dueDate
				+ ", created_At=" + created_At + ", updated_At=" + updated_At + "]";
	}
	
    
	
}
