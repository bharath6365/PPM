import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AddProjectTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    //const { id } = this.props.match.params;
    const {visibility} = this.props;
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
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="summary"
                        placeholder="Task Title"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control form-control-lg"
                        placeholder="Task Description"
                        name="detailedDescription"
                      />
                    </div>
                    <h6>Due Date</h6>
                    <div className="form-group">
                      <input type="date" className="form-control form-control-lg" name="dueDate" />
                    </div>
                    <div className="form-group">
                      <select className="form-control form-control-lg" name="priority">
                        <option value={null}>Select Priority</option>
                        <option value={"HIGH"}>High</option>
                        <option value={"MEDIUM"}>Medium</option>
                        <option value={"LOW"}>Low</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <select className="form-control form-control-lg" name="status">
                        <option value={null}>Select Status</option>
                        <option value="TODO">TO DO</option>
                        <option value="INPROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
