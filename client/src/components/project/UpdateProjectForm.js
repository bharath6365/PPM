import React, { Component } from 'react';

import {connect} from 'react-redux';
import {
  EuiDatePicker,
  EuiFieldText,
  EuiFormRow,
  EuiTextArea,
  EuiForm,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingChart
} from '@elastic/eui';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
// Not technically create project. Can also be used to update.
import { createProject, getProjectByIdentifier, resetProject } from '../../actions/projectActions';
import PageLoader from '../common/page-loader';

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

 handleStartDate = (date) => {
    this.setState({
      start_date: date
    });
  };

  handleEndDate = (date) => {
    this.setState({
      end_date: date
    });
  };

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
    }
    
  }
  
  componentWillReceiveProps(nextProps) {
    // Project was Empty before. But now there was an update for the project.
    if (Object.keys(this.props.project).length < 1 && Object.keys(nextProps.project).length > 1) {
      const startDate = nextProps['project']['start_date'];
      const endDate = nextProps['project']['end_date'];
      this.setState({
        projectName: nextProps.project.projectName,
        projectDescription: nextProps.project.projectDescription,
        projectIdentifier: nextProps.project.projectIdentifier,
        start_date: startDate ? moment(startDate) : null,
        end_date: endDate ? moment(endDate) : null
      })
    }
  }

  // On unmount reset the project object.
  componentWillUnmount() {
    this.props.resetProject();
  }

  renderForm() {
    const {errors} = this.props;
    return (
      <div className="page-container">
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={4}>
            <h2>Update Project</h2>
          </EuiFlexItem>
          <EuiFlexItem grow={8} 
          className={`form-container 
            ${Object.keys(errors).length > 0 ? 'error' : ''}
          `}>
            <EuiForm onSubmit={this.handleSubmit} fullWidth>
              <div className="form-group">
                <EuiFieldText
                  fullWidth
                  placeholder="Project Name"
                  name="projectName"
                  onChange={this.onChange}
                  value={this.state.projectName}
                  aria-label="Project Name"
                />
                <p>{errors.projectName}</p>
              </div>

              <div className="form-group">
                <EuiFieldText
                  fullWidth
                  readOnly
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  onChange={this.onChange}
                  value={this.state.projectIdentifier}
                  aria-label="Project ID"
                />
                <p>{errors.projectIdentifier}</p>
              </div>
              <div className="form-group">
                <EuiTextArea
                  fullWidth
                  placeholder="Project Description"
                  name="projectDescription"
                  value={this.state.projectDescription}
                  onChange={this.onChange}
                  aria-label="Project Description"
                />
                <p>{errors.projectDescription}</p>
              </div>

              <EuiFormRow fullWidth label="Start Date">
                <EuiDatePicker
                  fullWidth
                  name="start_date"
                  selected={this.state.start_date}
                  onChange={this.handleStartDate}
                />
              </EuiFormRow>

              <EuiFormRow fullWidth label="End Date">
                <EuiDatePicker fullWidth name="end_date" selected={this.state.end_date} onChange={this.handleEndDate} />
              </EuiFormRow>

              <EuiButton fill color="warning" onClick={this.handleSubmit}>
                Update Project
              </EuiButton>
            </EuiForm>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    )
  }

  render() {
    // This is set only when project is fetched from the backend.
    if (this.state.projectIdentifier.length > 0) {
      return this.renderForm();
    }

    return (
      <PageLoader />
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