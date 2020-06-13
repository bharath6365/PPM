import React, { Component } from 'react';
import {
  EuiDatePicker,
  EuiFieldText,
  EuiSelect,
  EuiTextArea,
  EuiForm,
  EuiButton,
} from '@elastic/eui';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const taskOptions = [
  { value: 'TODO', text: 'Todo' },
  { value: 'INPROGRESS', text: 'In-Progress' },
  { value: 'DONE', text: 'Done' }
];

const priorityOptions = [
  { value: 'HIGH', text: 'High' },
  { value: 'MEDIUM', text: 'Medium' },
  { value: 'LOW', text: 'Low' }
]

export default class AddProjectTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: '',
      detailedDescription: '',
      dueDate: null,
      priority: priorityOptions[0].value,
      status: taskOptions[0].value
    };
  }

  // Responds to input change and updates the state.
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  

  handleDueDate = (date) => {
    this.setState({
      dueDate: date
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
            <EuiForm onSubmit={this.handleSubmit} fullWidth>
              <div className="form-group">
                <EuiFieldText
                  fullWidth
                  type="text"
                  name="summary"
                  placeholder="Task Title"
                  value={summary}
                  required
                  onChange={this.handleChange}
                />
                <p>{errors.summary}</p>
              </div>
              <div className="form-group">
                <EuiTextArea
                  fullWidth
                  placeholder="Task Description"
                  name="detailedDescription"
                  value={detailedDescription}
                  onChange={this.handleChange}
                />
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <EuiDatePicker fullWidth selected={dueDate} name="dueDate" onChange={this.handleDueDate} />
              </div>
              <h6>Priority</h6>
              <div className="form-group">
                <EuiSelect
                  fullWidth
                  value={priority}
                  options={priorityOptions}
                  name="priority"
                  onChange={e => this.handleChange(e)}
                />
              </div>

              <h6>Status</h6>
              <div className="form-group">
                <EuiSelect
                  fullWidth
                  value={status}
                  name="status"
                  options={taskOptions}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <EuiButton fill color="primary" onClick={this.handleSubmit}>
                Submit
              </EuiButton>
            </EuiForm>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
