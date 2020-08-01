/* 
  ProjectItem component that displays the project name, description and buttons
  to update, delete the project.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EuiPanel,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiIcon,
  EuiTextColor,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../actions/projectActions';
import { connect } from 'react-redux';

class ProjectItem extends Component {
  // Handle project delete.
  handleDelete = (identifier) => {
    const confirmDelete = window.confirm('Do you want to delete this project?');
    if (confirmDelete) {
      this.props.deleteProject(identifier, this.props.history);
    }
  };
  render() {
    const { project } = this.props;
    const { projectName, projectDescription, projectIdentifier } = project;
    const updateProjectRoute = `/update-project/${projectIdentifier}`;
    return (
        <EuiPanel className="mb-4">
          <div className="card card-body" style={{ background: 'black' }}>
            <EuiFlexGroup direction={'row'}>
              <EuiFlexItem>
                <span className="pill">{projectIdentifier}</span>
              </EuiFlexItem>
              <EuiFlexItem grow={6}>
                <h3
                  style={{
                    maxWidth: '300px'
                  }}
                  className="eui-textTruncate"
                >
                  {projectName}
                </h3>
                <EuiTextColor color="secondary">
                  <p
                    style={{
                      maxWidth: '300px'
                    }}
                    className="eui-textTruncate"
                  >
                    {projectDescription}
                  </p>
                </EuiTextColor>
              </EuiFlexItem>

              <EuiFlexItem grow={2}>
                <EuiKeyPadMenu>
                  <Link to={`/project-board/${projectIdentifier}`}>
                    <EuiKeyPadMenuItem label="Board">
                      <EuiIcon type="dashboardApp" size="l" />
                    </EuiKeyPadMenuItem>
                  </Link>

                  <Link to={updateProjectRoute}>
                    <EuiKeyPadMenuItem label="Update">
                      <EuiIcon type="pencil" size="l" />
                    </EuiKeyPadMenuItem>
                  </Link>

                  <EuiKeyPadMenuItem label="Delete" onClick={() => this.handleDelete(projectIdentifier)}>
                    <EuiIcon type="trash" size="l" />
                  </EuiKeyPadMenuItem>
                </EuiKeyPadMenu>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </EuiPanel>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired
};

export default connect(null, {
  deleteProject
})(ProjectItem);
