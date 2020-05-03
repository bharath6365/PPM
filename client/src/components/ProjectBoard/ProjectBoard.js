import React, { Component } from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AddProjectTaskForm from './ProjectTasks/AddProjectTaskForm';
import {addProjectTask} from '../../actions/backlogActions';


class ProjectBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      createProjectModalVisibility: false
    }    
  }
  
  // Create Task form related.
  handleCreateProjectClick = () => {
    this.setState({
      createProjectModalVisibility: true
    })
  }

  handleCreateProjectModalCancel = () => {
    this.setState({
      createProjectModalVisibility: false
    })
  }
 
  handleCreateTaskFormSuccess = (incomingTask) => {
    console.log('Incoming task is', incomingTask);
  }
  render() {
    // Get the backlog id from react router.
    const {id} = this.props.match.params;
    return (
      <div className="container">
        <button onClick={this.handleCreateProjectClick} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </button>
        <br />
        <hr />

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                  <h3>TO DO</h3>
                </div>
              </div>

              <div className="card mb-1 bg-light">
                <div className="card-header text-primary">ID: projectSequence -- Priority: priorityString</div>
                <div className="card-body bg-light">
                  <h5 className="card-title">project_task.summary</h5>
                  <p className="card-text text-truncate ">project_task.acceptanceCriteria</p>
                  <Link className="btn btn-primary">View / Update</Link>

                  <button className="btn btn-danger ml-4">Delete</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-primary text-white">
                  <h3>In Progress</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-success text-white">
                  <h3>Done</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* Set up Modals */}
        {/* Create a Task modal */}
        <AddProjectTaskForm 
          visibility = {this.state.createProjectModalVisibility}
          handleClose = {this.handleCreateProjectModalCancel}
          formSuccess = {this.handleCreateTaskFormSuccess}
        />
      </div>
    );
  }
}


export default connect(null, {
  addProjectTask
})(ProjectBoard);