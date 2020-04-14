import React, { Component } from 'react';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import {createProject} from '../../actions/projectActions';

/*
  Form input names should match the backend.
*/ 
class CreateProjectForm extends Component {
  constructor(props){
    super(props);

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
  const newProject = {
    projectName,
    projectDescription,
    projectIdentifier,
    start_date,
    end_date
  }

  // Pass it off to the action
  createProject(newProject, history);
 }

 
  render() {
    const {errors} = this.props;
    const formGroup = "form-group";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create / Edit Project form</h5>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.formErrors
  }
}

// Check the spelling on propTypes.
CreateProjectForm.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}


export default connect(mapStateToProps, {
  createProject
})(CreateProjectForm)