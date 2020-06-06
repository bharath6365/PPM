/*
  Displays a list of all the projects on the Server.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import ProjectItem from './project/ProjectItem';
import CreateProjectButton from './project/CreateProjectButton';
import { getAllProjects } from '../actions/projectActions';

class Dashboard extends Component {
  componentDidMount() {
    // When component mounts we need to dispatch the Get All functions function.
    this.props.getAllProjects();
  }
  render() {
    const { project } = this.props;
    return (
      <div className="page-container">
        <h1 className="display-4 text-center">Projects</h1>
        <hr />
        <CreateProjectButton />
        <br />
        {project.projects.map((project) => {
          return (
            <div className="col-md-12">
              <ProjectItem project={project} />
            </div>
          );
        })}
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
})(Dashboard);
