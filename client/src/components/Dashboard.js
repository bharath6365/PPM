/*
  Displays a list of all the projects on the Server.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Proptypes from 'prop-types';
import ProjectItem from './project/ProjectItem';
import { getAllProjects } from '../actions/projectActions';
import SectionHeader from './common/section-header';

class Dashboard extends Component {

  handleCreateProjectButtonClick = () => {
    this.props.history.push('/add-project');
  }
  componentDidMount() {
    // When component mounts we need to dispatch the Get All functions function.
    this.props.getAllProjects();
  }
  render() {
    const { project } = this.props;
    return (
      <div className="page-container">
        <SectionHeader heading="Projects" buttonHeading="Add Project" handleClick={this.handleCreateProjectButtonClick} />
        
        <div className="container">
          {project.projects.map((project) => {
          return (
            <ProjectItem project={project} />
          );
          })}
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project
});

Dashboard.propTypes = {
  project: Proptypes.object.isRequired,
  getAllProjects: Proptypes.func.isRequired
};

export default connect(mapStateToProps, {
  getAllProjects
})(withRouter(Dashboard));
