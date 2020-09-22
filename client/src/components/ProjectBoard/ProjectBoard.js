import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import AddProjectTaskForm from './ProjectTasks/AddProjectTaskForm';
import UpdateProjectTaskForm from './ProjectTasks/UpdateProjectTaskForm';
import ProjectTask from './ProjectTasks/ProjectTask';
import {
  addProjectTask,
  getAllTasks,
  getTask,
  updateProjecTask,
  resetProjectTask,
  deleteProjectTask
} from '../../actions/backlogActions';
import { resetFormErrors } from '../../actions/formActions';
import SectionHeader from '../common/section-header';
import PageLoader from '../common/page-loader';
import Callout from '../common/callout';

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
    this.props.resetProjectTask();
    this.props.resetFormErrors();
  };

  // Pass on the incoming task to the action.
  handleCreateTaskFormSuccess = (incomingTask) => {
    return new Promise((resolve, reject) => {
      // Get the backlog id from the URL
      const { id: backlogId } = this.props.match.params;
      this.props
        .addProjectTask(backlogId, incomingTask)
        .then((res) => {
          if (res !== 'ERROR') {
            this.handleModalClose();
            reject(null);
          }
          resolve(null);
        })
        .catch(() => reject(null));
    });
  };

  /**
   *  Functions for update task modal.
   */
  // Trigger the visibility of the update modal.
  handleUpdateProjectClick = (projectIdentifier, taskSequence) => {
    this.props
      .getTask(projectIdentifier, taskSequence)
      .then(() => {
        this.setState({
          updateProjectModalVisibility: true
        });
      })
      .catch(() => {
        alert('Error while fetching the task information');
      });

    this.handleModalClose();
  };

  handleUpdateTaskFormSuccess = (incomingTask) => {
    return new Promise((resolve, reject) => {
      const { id: backlogId } = this.props.match.params;
      this.props
        .updateProjecTask(backlogId, incomingTask, true)
        .then((res) => {
          if (res !== 'ERROR') {
            // Hide the create modal.
            // this.setState({
            //   updateProjectModalVisibility: false
            // });
            reject(null);
            this.handleModalClose();
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  handleTaskDelete = (projectIdentifier, taskSequence) => {
    this.props.deleteProjectTask(projectIdentifier, taskSequence);
  };

  renderEmptyTasks() {
    return (
      <Callout
        title="Welcome mate"
        color="success"
        handleClick={this.handleCreateProjectClick}
        para="I have no tasks. Which is good!"
        linkText="here&rsquo;s how you can add one."
      />
    );
  }

  render() {
    const { projectTasks, tasksLoading } = this.props;
    const { errors } = this.props;

    if (tasksLoading) {
      return <PageLoader />;
    }

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
        <SectionHeader heading="Tasks" buttonHeading="Add a task" handleClick={this.handleCreateProjectClick} />

        {emptyTask && this.renderEmptyTasks()}

        {/* TODO: Clean up repetitive logic. */}
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
        <UpdateProjectTaskForm
          visibility={this.state.updateProjectModalVisibility}
          handleClose={this.handleCreateProjectModalCancel}
          formSuccess={this.handleUpdateTaskFormSuccess}
          currentTask={this.props.currentTask || {}}
          errors={errors}
          closeModal={this.handleModalClose}
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
    currentTask: state.backlog.projectTask,
    tasksLoading: state.backlog.tasksLoading
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addProjectTask,
    getAllTasks,
    getTask,
    updateProjecTask,
    resetProjectTask,
    deleteProjectTask,
    resetFormErrors
  })(ProjectBoard)
);
