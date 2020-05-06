import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AddProjectTaskForm from './ProjectTasks/AddProjectTaskForm';
import ProjectTask from './ProjectTasks/ProjectTask';
import { addProjectTask, getAllTasks } from '../../actions/backlogActions';

class ProjectBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      createProjectModalVisibility: false
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

  handleCreateProjectModalCancel = () => {
    this.setState({
      createProjectModalVisibility: false
    });
  };

  // Pass on the incoming task to the action.
  handleCreateTaskFormSuccess = (incomingTask) => {
    // Get the backlog id from the URL
    const { id: backlogId } = this.props.match.params;
    this.props.addProjectTask(backlogId, incomingTask).then(() => {
      // Hide the create modal.
      this.setState({
        createProjectModalVisibility: false
      });
    });
  };
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
                return <ProjectTask key={task.id}  task={task} />;
              })}
            </div>

            <div className="col-md-12 task-container">
              <h3 className="group-heading inprogress">In-Progress</h3>
              {inProgressTasks.map((task) => {
                return <ProjectTask key={task.id} task={task} />;
              })}
            </div>

            <div className="col-md-12 task-container">
              <h3 className="group-heading done">Done</h3>
              {doneTasks.map((task) => {
                return <ProjectTask key={task.id} task={task} />;
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projectTasks: state.backlog.projectTasks,
    errors: state.formErrors
  };
};

export default connect(mapStateToProps, {
  addProjectTask,
  getAllTasks
})(ProjectBoard);
