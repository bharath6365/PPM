import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class EditProjectTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: '',
      detailedDescription: '',
      dueDate: null,
      priority: 'LOW',
      status: 'TODO'
    };
  }

  // Get the current task. We need a couple of things. Project Identifier, task sequence for     differentiating between tasks.
  componentWillReceiveProps(nextProps) {
    console.log('Will Receive props', nextProps);
    if (Object.keys(this.props.currentTask).length < 1 && Object.keys(nextProps.currentTask).length > 0) {
      // Project Board successfully fetched the current task. Set it to state.
      this.setState({
        summary: nextProps.currentTask.summary,
        detailedDescription: nextProps.currentTask.detailedDescription,
        dueDate: nextProps.currentTask.dueDate,
        priority: nextProps.currentTask.priority,
        status: nextProps.currentTask.status
      });
    }
  }

  // Responds to input change and updates the state.
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /*
    Handle Form Submission.
    This component is just responsible for showing errors. Dispatching an action
    is handled by the parent component. For update tasks to work id needs to be passed.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    const { summary, detailedDescription, dueDate, priority, status } = this.state;
    const newTask = {
      summary,
      detailedDescription,
      dueDate,
      priority,
      status,
      id: this.props.currentTask.id
    };

    this.props.formSuccess(newTask);
  };

  render() {
    const { errors, visibility } = this.props;
    const { summary, detailedDescription, dueDate, priority, status } = this.state;
    return (
      <Modal show={visibility} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="add-PBI">
            <div className="container">
              <div className="row">
                <div className="col-md-12 m-auto">
                  <form onSubmit={this.handleSubmit}>
                    <div className={`form-group ${errors && errors.summary ? 'error' : ''}`}>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="summary"
                        placeholder="Task Title"
                        value={summary}
                        required
                        onChange={this.handleChange}
                      />
                      <p>{errors && errors.summary}</p>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control form-control-lg"
                        placeholder="Task Description"
                        name="detailedDescription"
                        value={detailedDescription}
                        onChange={this.handleChange}
                      />
                    </div>
                    <h6>Due Date</h6>
                    <div className="form-group">
                      <input
                        value={dueDate}
                        type="date"
                        className="form-control form-control-lg"
                        name="dueDate"
                        onChange={this.handleChange}
                      />
                    </div>
                    <h6>Priority</h6>
                    <div className="form-group">
                      <select
                        value={priority}
                        className="form-control form-control-lg"
                        name="priority"
                        onChange={this.handleChange}
                      >
                        <option value={'HIGH'}>High</option>
                        <option value={'MEDIUM'}>Medium</option>
                        <option value={'LOW'}>Low</option>
                      </select>
                    </div>

                    <h6>Status</h6>
                    <div className="form-group">
                      <select
                        value={status}
                        className="form-control form-control-lg"
                        name="status"
                        onChange={this.handleChange}
                      >
                        <option value="TODO">Todo</option>
                        <option value="INPROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                      </select>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
