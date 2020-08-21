import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  EuiDatePicker,
  EuiFieldText,
  EuiSelect,
  EuiTextArea,
  EuiForm,
  EuiButton,
  EuiModal,
  EuiFormRow,
  EuiModalBody,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiOverlayMask,
  EuiModalHeader,
  EuiModalHeaderTitle
} from '@elastic/eui';



const taskOptions = [
  { value: 'TODO', text: 'Todo' },
  { value: 'INPROGRESS', text: 'In-Progress' },
  { value: 'DONE', text: 'Done' }
];


const priorityOptions = [
  { value: 'HIGH', text: 'High' },
  { value: 'MEDIUM', text: 'Medium' },
  { value: 'LOW', text: 'Low' }
];

export default class UpdateProjectTaskForm extends Component {
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
    if (Object.keys(this.props.currentTask).length < 1 && Object.keys(nextProps.currentTask).length > 0) {
      // Project Board successfully fetched the current task. Set it to state.
      this.setState({
        summary: nextProps.currentTask.summary,
        detailedDescription: nextProps.currentTask.detailedDescription,
        // dueDate: nextProps.currentTask.dueDate || null,
        priority: nextProps.currentTask.priority,
        status: nextProps.currentTask.status,
        projectSeqeunce: nextProps.currentTask.projectSeqeunce,
        projectIdentifier: nextProps.currentTask.projectIdentifier
      });
    }
  }

  // Responds to input change and updates the state.
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  // Date Picker
  handleDueDate = (date) => {
    this.setState({
      dueDate: date
    });
  };

  /*
    Handle Form Submission.
    This component is just responsible for showing errors. Dispatching an action
    is handled by the parent component. For update tasks to work id needs to be passed.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    const {id} = this.props.currentTask;
    // If there is no id our API will create a task. Need to return.
    if (!id) {
      alert('No ID found');
      return;
    }
    const { summary, detailedDescription, dueDate, priority, status, projectSeqeunce, projectIdentifier } = this.state;
    const newTask = {
      summary,
      detailedDescription,
      dueDate,
      priority,
      projectSeqeunce,
      projectIdentifier,
      status,
      id: this.props.currentTask.id,
    };

    this.props.formSuccess(newTask);
  };

  closeModal = () => {
    this.props.closeModal();
  };

  renderModal = () => {
    let modal;
    const { errors, visibility } = this.props;
    const { summary, detailedDescription, dueDate, priority, status } = this.state;
    if (visibility) {
      modal = (
        <EuiOverlayMask onClick={this.closeModal}>
          <EuiModal onClose={this.closeModal} initialFocus="[name=popswitch]">
            <EuiModalHeader>
      <EuiModalHeaderTitle>Update Task</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
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
                    <p>{errors && errors.summary}</p>
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
                  <EuiFormRow fullWidth label="Due Date">
                    <EuiDatePicker fullWidth selected={dueDate} name="dueDate" onChange={this.handleDueDate} />
                  </EuiFormRow>
                  <EuiFormRow fullWidth label="Priority">
                    <EuiSelect
                      fullWidth
                      value={priority}
                      options={priorityOptions}
                      name="priority"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </EuiFormRow>

                  <EuiFormRow fullWidth label="Status">
                    <EuiSelect
                      fullWidth
                      value={status}
                      name="status"
                      options={taskOptions}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </EuiFormRow>
                </EuiForm>
              </div>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>

              <EuiButton onClick={this.handleSubmit} fill>
                Save
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    } else {
      modal = <Fragment />;
    }

    return (
      <div>
        {modal}
      </div>
    );
  };

  render() {
    return this.renderModal();
  }
}
