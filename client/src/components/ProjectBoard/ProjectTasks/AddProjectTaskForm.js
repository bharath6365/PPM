import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AddProjectTaskForm extends Component {
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

  // Responds to input change and updates the state.
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /*
    Handle Form Submission.
    This component is just responsible for showing errors. Dispatching an action
    is handled by the parent component.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    const { summary, detailedDescription, dueDate, priority, status } = this.state;
    const newTask = {
      summary,
      detailedDescription,
      dueDate,
      priority,
      status
    };

    this.props.formSuccess(newTask);
  };

  render() {
    const { errors } = this.props;
    const { visibility } = this.props;
    const { summary, detailedDescription, dueDate, priority, status } = this.state;
    return (
      <Modal show={visibility} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="add-PBI">
            <div className="container">
              <div className="row">
                <div className="col-md-12 m-auto">
                  <form onSubmit={this.handleSubmit}>
                    <div className={`form-group ${errors.summary ? 'error' : ''}`}>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="summary"
                        placeholder="Task Title"
                        value={summary}
                        required
                        onChange={this.handleChange}
                      />
                      <p>{errors.summary}</p>
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
