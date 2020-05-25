import React, { Component } from 'react';

import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// Not technically create project. Can also be used to update.
import { createProject, getProjectByIdentifier, resetProject } from '../../actions/projectActions';

class UpdateProjectForm extends Component {

  constructor(props) {
    super(props);
    
    // This will change after we receive props.
    this.state = {
      projectName: "",
      projectDescription: "",
      projectIdentifier: "",
      start_date: new Date(),
      end_date: ""
    }
  }

  /*
    On Change function for input field change.

  */
 onChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
 }

  /*
   Form Submission.
 */
 handleSubmit = (e) => {
  e.preventDefault();
  const {projectName, projectDescription, projectIdentifier, start_date, end_date} = this.state;
  const {createProject, history} = this.props;
  const updatedProject = {
    projectName,
    projectDescription,
    projectIdentifier,
    start_date,
    end_date,
    projectOwner: this.props.username,
    // This is required for JPA to not consider as a new project.
    id: this.props.project.id
  }
  // Pass it off to the action
  createProject(updatedProject, history, true);
 }
 
  
  componentDidMount() {
    // Get the Project Identifer from the URL.
    let parameter;
    const {match} = this.props;
    // If Project Identifier is present in the URL. Dispatch the get project action.
    if (match.params.identifier) {
      parameter = match.params.identifier;
      setTimeout(() => {
        this.props.getProjectByIdentifier(parameter, this.props.history);
      }, 200)
      
    } else {
      // console.log('This ran');
      // // Todo: Redirect back to the dashboard.
      // // Send a message to the user saying project not found
      // toastr.error(`Error`, `Project not found`);
      // // Redirect to dashboard.
      // this.props.history.push('/dashboard');
    }
    
  }
  
  componentWillReceiveProps(nextProps) {
    // Project was Empty before. But now there was an update for the project.
    if (Object.keys(this.props.project).length < 1 && Object.keys(nextProps.project).length > 1) {
      this.setState({
        projectName: nextProps.project.projectName,
        projectDescription: nextProps.project.projectDescription,
        projectIdentifier: nextProps.project.projectIdentifier,
        start_date: nextProps['project']['start_date'],
        end_date: nextProps['project']['end_date']
      })
    }
  }

  // On unmount reset the project object.
  componentWillUnmount() {
    this.props.resetProject();
  }

  renderForm() {
    const {errors} = this.props;
    const formGroup = "form-group";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit Project</h5>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div 
                  className={errors.projectName ? `error ${formGroup}` : `${formGroup}`} 
                >
                  <input type="text" className="form-control form-control-lg " placeholder="Project Name" 
                  name="projectName"
                  
                  onChange={this.onChange}
                  value={this.state.projectName}
                  />
                  <p>{errors.projectName}</p>
                </div>

                <div 
                  className={errors.projectIdentifier ? `error ${formGroup}` : `${formGroup}`} 
                >
                  <input type="text" className="form-control form-control-lg" placeholder="Unique Project ID" 
                  name="projectIdentifier"
                  disabled
                  onChange={this.onChange}
                  value={this.state.projectIdentifier}
                  />
                  <p>{errors.projectIdentifier}</p>
                </div>
                <div 
                  className={errors.projectDescription ? `error ${formGroup}` : `${formGroup}`} 
                >
                  <textarea 
                    className="form-control form-control-lg" 
                    placeholder="Project Description" 
                    name="projectDescription"
                    
                    value={this.state.projectDescription}
                    onChange={this.onChange}
                  />
                  <p>{errors.projectDescription}</p>
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input type="date" className="form-control form-control-lg" name="start_date"
                    value={this.state.start_date} onChange={this.onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input type="date" className="form-control form-control-lg" name="end_date" 
                    value={this.state.end_date} onChange={this.onChange}
                  />
                </div>

                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    // This is set only when project is fetched from the API
    console.log('State is ', this.state);
    if (this.state.projectIdentifier.length > 0) {
      return this.renderForm();
    }
    // Todo: Add a common loader for our entire project.
    return (
      <div>
        Loading...
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project.project,
    errors: state.formErrors,
    username: state.security.user.username
  }
}


export default withRouter(connect(mapStateToProps, {
  getProjectByIdentifier,
  createProject,
  resetProject
})(UpdateProjectForm));