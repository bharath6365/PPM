import {
  EuiDatePicker,
  EuiFieldText,
  EuiFormRow,
  EuiTextArea,
  EuiForm,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';

/*
  Form input names should match the backend.
*/

class CreateProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      projectDescription: '',
      projectIdentifier: '',
      start_date: moment(),
      end_date: ''
    };
  }

  /*
    On Change function for input field change.

  */
  onChange = (e) => {
    console.log('Event is', e);
    // If its not a date.
    if (e.target) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

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
    const { projectName, projectDescription, projectIdentifier, start_date, end_date } = this.state;
    const { createProject, history } = this.props;
    const newProject = {
      projectName,
      projectDescription,
      projectIdentifier,
      start_date,
      end_date,
      projectOwner: this.props.username
    };

    // Pass it off to the action
    createProject(newProject, history);
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="page-container">
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={4}>
            <h2>Create Project Form</h2>
            <p>Project Identifer let's you identify different projects by ID.</p>
          </EuiFlexItem>
          <EuiFlexItem grow={8} 
          className={`form-container 
            ${Object.keys(errors).length > 0 ? 'error' : ''}
          `}>
            <EuiForm onSubmit={this.handleSubmit} fullWidth>
              <div>
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

              <div>
                <EuiFieldText
                  fullWidth
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  onChange={this.onChange}
                  value={this.state.projectIdentifier}
                  aria-label="Project ID"
                />
                <p>{errors.projectIdentifier}</p>
              </div>
              <div>
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

              <EuiButton fill color="primary" onClick={this.handleSubmit}>
                Submit
              </EuiButton>
            </EuiForm>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.formErrors,
    username: state.security.user.username
  };
};

// Check the spelling on propTypes.
CreateProjectForm.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  createProject
})(withRouter(CreateProjectForm));
