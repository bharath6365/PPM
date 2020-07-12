import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { EuiCallOut, EuiLink } from '@elastic/eui';

import AddProjectTaskForm from './ProjectTasks/AddProjectTaskForm';
import EditProjectTaskForm from './ProjectTasks/EditProjectTaskForm';
import ProjectTask from './ProjectTasks/ProjectTask';
import {
  addProjectTask,
  getAllTasks,
  getTask,
  updateProjecTask,
  resetProjectTask,
  deleteProjectTask
} from '../../actions/backlogActions';

class ProjectBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      createProjectModalVisibility: false,
      // Flags for updating tasks.
      updateProjectModalVisibility: false
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
    

    this.props.resetProjectTask();
  };

  // Will Close all Modals
  handleModalClose = () => {
    this.setState({
      createProjectModalVisibility: false,
      updateProjectModalVisibility: false
    });
  }

  // Pass on the incoming task to the action.
  handleCreateTaskFormSuccess = (incomingTask) => {
    // Get the backlog id from the URL
    const { id: backlogId } = this.props.match.params;
    this.props.addProjectTask(backlogId, incomingTask).then(() => {
      // Hide the create modal.
      this.setState({
        createProjectModalVisibility: false
      });
    })
  };

  /**
   *  Functions for update task modal.
   */
  // Trigger the visibility of the update modal.
  handleUpdateProjectClick = (projectIdentifier, taskSequence) => {
    this.props.getTask(projectIdentifier, taskSequence);
    this.setState({
      updateProjectModalVisibility: true
    });
  };

  handleUpdateTaskFormSuccess = (incomingTask) => {
    const { id: backlogId } = this.props.match.params;
    this.props.updateProjecTask(backlogId, incomingTask, true).then(() => {
      // Hide the create modal.
      this.setState({
        updateProjectModalVisibility: false
      });
    });
  };

  handleTaskDelete = (projectIdentifier, taskSequence) => {
    this.props.deleteProjectTask(projectIdentifier, taskSequence);
  };

  renderEmptyTasks() {
    return (
      <EuiCallOut title="Good news, everyone!" color="success" iconType="user">
        <p>
          I have no tasks. Which is good! And <EuiLink onClick={this.handleCreateProjectClick}>here&rsquo;s how you can add one.</EuiLink>.
        </p>
      </EuiCallOut>
    );
  }

  render() {
    const { projectTasks } = this.props;
    const { errors } = this.props;

    let emptyTask = false;

    // Separate Arrays for different status.
    let todoTasks = [];
    let inProgressTasks = [];
    let doneTasks = [];

    if (projectTasks.length > 0) {
      for (let task of projectTasks) {
        if (task.status === 'INPROGRESS') {
          inProgressTasks.push(task);
        } else if (task.status === 'DONE') {
          doneTasks.push(task);
        } else {
          todoTasks.push(task);
        }
      }
    } else {
      emptyTask = true;
    }

    return (
      <div className="project-board-container page-container">
        <button onClick={this.handleCreateProjectClick} className="create-button float-right">
          <span className="text">Add a TASK</span>
          <svg
            class="bi bi-plus"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <br />
        <hr />

        {emptyTask && this.renderEmptyTasks()}

        {!emptyTask && (
          <div className="container">
            <div className="row">
              <div className="col-md-12 task-container">
                <h3 className="group-heading todo">Todo</h3>
                {todoTasks.map((task) => {
                  return (
                    <ProjectTask
                      key={task.id}
                      task={task}
                      handleUpdate={this.handleUpdateProjectClick}
                      handleDelete={this.handleTaskDelete}
                    />
                  );
                })}
              </div>

              <div className="col-md-12 task-container">
                <h3 className="group-heading inprogress">In-Progress</h3>
                {inProgressTasks.map((task) => {
                  return (
                    <ProjectTask
                      key={task.id}
                      task={task}
                      handleUpdate={this.handleUpdateProjectClick}
                      handleDelete={this.handleTaskDelete}
                    />
                  );
                })}
              </div>

              <div className="col-md-12 task-container">
                <h3 className="group-heading done">Done</h3>
                {doneTasks.map((task) => {
                  return (
                    <ProjectTask
                      key={task.id}
                      task={task}
                      handleUpdate={this.handleUpdateProjectClick}
                      handleDelete={this.handleTaskDelete}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Set up Modals */}
        {/* Create a Task modal */}
        <AddProjectTaskForm
          visibility={this.state.createProjectModalVisibility}
          handleClose={this.handleCreateProjectModalCancel}
          formSuccess={this.handleCreateTaskFormSuccess}
          errors={errors}
          closeModal={this.handleModalClose}
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

export default withRouter(
  connect(mapStateToProps, {
    addProjectTask,
    getAllTasks,
    getTask,
    updateProjecTask,
    resetProjectTask,
    deleteProjectTask
  })(ProjectBoard)
);
