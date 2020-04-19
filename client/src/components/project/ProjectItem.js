/* 
  ProjectItem component that displays the project name, description and buttons
  to update, delete the project.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { deleteProject } from '../../actions/projectActions';
import { connect } from 'react-redux';

class ProjectItem extends Component {
  // Handle project delete.
  handleDelete = (identifier) => {
    this.props.deleteProject(identifier);
  }
  render() {
    const {project} = this.props;
    const {projectName, projectDescription, projectIdentifier} = project;
    const updateProjectRoute = `/update-project/${projectIdentifier}`;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{projectName}</h3>
              <p>{projectDescription}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <a href="#">
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1">Project Board </i>
                  </li>
                </a>
                <Link to={updateProjectRoute}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1">Update Project Info</i>
                  </li>
                </Link>
                <li onClick={() => handleDelete(projectIdentifier)} className="list-group-item delete">
                  <i className="fa fa-minus-circle pr-1">Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired
}

export default connect(null, {
  deleteProject
})(ProjectItem);