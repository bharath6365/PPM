import React, { Component } from 'react';

/*
  Form input names should match the backend.
*/
export default class CreateProjectForm extends Component {
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

  const newProject = {
    projectName,
    projectDescription,
    projectIdentifier,
    start_date,
    end_date
  }

  console.log(newProject);
 }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create / Edit Project form</h5>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg " placeholder="Project Name" 
                  name="projectName"
                  required
                  onChange={this.onChange}
                  value={this.state.projectName}
                  />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Unique Project ID" 
                  name="projectIdentifier"
                  required
                  onChange={this.onChange}
                  value={this.state.projectIdentifier}
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    className="form-control form-control-lg" 
                    placeholder="Project Description" 
                    name="projectDescription"
                    required
                    value={this.state.projectDescription}
                    onChange={this.onChange}
                  />
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
