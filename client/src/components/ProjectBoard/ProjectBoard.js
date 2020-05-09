import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AddProjectTaskForm from './ProjectTasks/AddProjectTaskForm';
import EditProjectTaskForm from './ProjectTasks/EditProjectTaskForm';
import ProjectTask from './ProjectTasks/ProjectTask';
import { addProjectTask, getAllTasks, getTask, updateProjecTask, resetProjectTask, deleteProjectTask } from '../../actions/backlogActions';

class ProjectBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      createProjectModalVisibility: false,
      // Flags for updating tasks.
      updateProjectModalVisibility: false,
    };
  }

  componentDidMount() {
    const { id: projectIdentifier } = this.props.match.params;

    this.props.getAllTasks(projectIdentifier);
  }

  // Create Task form related.
  handleCreateProjectClick = () => {
    this.setState({
      createProjectModalVisibility: true
    });
  };
  
  // Reusing the same function for create, update modal.
  handleCreateProjectModalCancel = () => {
    this.setState({
      createProjectModalVisibility: false,
      updateProjectModalVisibility: false
    });

    this.props.resetProjectTask();
  };

  // Pass on the incoming task to the action.
  handleCreateTaskFormSuccess = (incomingTask) => {
    // Get the backlog id from the URL
    const { id: backlogId } = this.props.match.params;
    this.props.addProjectTask(backlogId, incomingTask).then(() => {
      // Hide the create modal.
      this.setState({
        createProjectModalVisibility: false,
      });
    });
  };

  /**
   *  Functions for update task modal.
   */
  // Trigger the visibility of the update modal.
  handleUpdateProjectClick = (projectIdentifier, taskSequence) => {

    this.props.getTask(projectIdentifier, taskSequence);
    this.setState({
      updateProjectModalVisibility: true
    })
  }

  handleUpdateTaskFormSuccess = (incomingTask) => {
    const { id: backlogId } = this.props.match.params;
    this.props.updateProjecTask(backlogId, incomingTask, true).then(() => {
      // Hide the create modal.
      this.setState({
        updateProjectModalVisibility: false,
      });
    });
  }

  handleTaskDelete = (projectIdentifier, taskSequence) => {
    this.props.deleteProjectTask(projectIdentifier, taskSequence);
  }

  render() {
    const { projectTasks } = this.props;
    const {errors} = this.props;

    // Separate Arrays for different status.
    let todoTasks = [];
    let inProgressTasks = [];
    let doneTasks = [];

    if (projectTasks) {
      for (let task of projectTasks) {
        if (task.status === 'INPROGRESS') {
          inProgressTasks.push(task);
        } else if (task.status === 'DONE') {
          doneTasks.push(task);
        } else {
          todoTasks.push(task);
        }
      }
    }

    return (
      <div className="project-board-container">
        <button onClick={this.handleCreateProjectClick} className="btn btn-primary mb-3 float-right">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </button>
        <br />
        <hr />

        <div className="container">
          <div className="row">
            <div className="col-md-12 task-container">
              <h3 className="group-heading todo">Todo</h3>
              {todoTasks.map((task) => {
                return <ProjectTask key={task.id}  task={task} handleUpdate={this.handleUpdateProjectClick} handleDelete={this.handleTaskDelete} />;
              })}
            </div>

            <div className="col-md-12 task-container">
              <h3 className="group-heading inprogress">In-Progress</h3>
              {inProgressTasks.map((task) => {
                return <ProjectTask key={task.id} task={task} handleUpdate={this.handleUpdateProjectClick} handleDelete={this.handleTaskDelete} />;
              })}
            </div>

            <div className="col-md-12 task-container">
              <h3 className="group-heading done">Done</h3>
              {doneTasks.map((task) => {
                return <ProjectTask key={task.id} task={task} handleUpdate={this.handleUpdateProjectClick} handleDelete={this.handleTaskDelete} />;
              })}
            </div>
          </div>
        </div>

        {/* Set up Modals */}
        {/* Create a Task modal */}
        <AddProjectTaskForm
          visibility={this.state.createProjectModalVisibility}
          handleClose={this.handleCreateProjectModalCancel}
          formSuccess={this.handleCreateTaskFormSuccess}
          errors = {errors}
        />

        {/* Update Task Modal */}
        <EditProjectTaskForm
          visibility={this.state.updateProjectModalVisibility}
          handleClose={this.handleCreateProjectModalCancel}
          formSuccess={this.handleUpdateTaskFormSuccess}
          currentTask={this.props.currentTask || {}}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // While updating the currentask will change based on an action dispatched by the backend.
  return {
    projectTasks: state.backlog.projectTasks,
    errors: state.formErrors,
    currentTask: state.backlog.projectTask
  };
};

export default connect(mapStateToProps, {
  addProjectTask,
  getAllTasks,
  getTask,
  updateProjecTask,
  resetProjectTask,
  deleteProjectTask
})(ProjectBoard);
