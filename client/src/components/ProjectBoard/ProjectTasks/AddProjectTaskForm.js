import React, { Component, Fragment } from 'react';
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

const INITIAL_STATE = {
  summary: '',
  detailedDescription: '',
  dueDate: null,
  priority: priorityOptions[0].value,
  status: taskOptions[0].value,
  buttonLoading: false
}
export default class AddProjectTaskForm extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      ...INITIAL_STATE
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

  closeModal = () => {
    this.props.closeModal();
  };

  /*
    Handle Form Submission.
    This component is just responsible for showing errors. Dispatching an action
    is handled by the parent component.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({buttonLoading: true});
    const { summary, detailedDescription, dueDate, priority, status } = this.state;
    const newTask = {
      summary,
      detailedDescription,
      dueDate,
      priority,
      status
    };

    this.props.formSuccess(newTask).finally(() => {
    this.setState({...INITIAL_STATE});
    });
  };

  renderModal = () => {
    let modal;
    const { errors, visibility } = this.props;
    const { summary, detailedDescription, dueDate, priority, status } = this.state;
    if (visibility) {
      modal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeModal} initialFocus="[name=popswitch]">
            <EuiModalHeader>
              <EuiModalHeaderTitle>Add a Task</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <div className={`form-container 
                ${Object.keys(errors).length > 0 ? 'error' : ''}
              `}>
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

                  <EuiFormRow fullWidth label="Status">
                    <EuiSelect
                      fullWidth
                      value={status}
                      name="status"
                      options={taskOptions}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </EuiFormRow>
                  
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

                </EuiForm>
              </div>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>

              <EuiButton isLoading={this.state.buttonLoading} onClick={this.handleSubmit} fill>
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
