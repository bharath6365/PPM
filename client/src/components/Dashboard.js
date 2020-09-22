/*
  Displays a list of all the projects on the Server.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import ProjectItem from './project/ProjectItem';
import { getAllProjects } from '../actions/projectActions';
import SectionHeader from './common/section-header';
import Callout from './common/callout';
import PageLoader from './common/page-loader';

class Dashboard extends Component {
  handleCreateProjectButtonClick = () => {
    this.props.history.push('/add-project');
  };
  componentDidMount() {
    // When component mounts we need to dispatch the Get All functions function.
    this.props.getAllProjects();
  }
  render() {
    const { project, projectsLoading } = this.props;
    return (
      <div className="page-container">
        <SectionHeader
          heading="Projects"
          buttonHeading="Add Project"
          handleClick={this.handleCreateProjectButtonClick}
        />

        {projectsLoading && <PageLoader />}

        {!projectsLoading && project.projects.length === 0 && (
          <Callout
            title="BareBones here."
            color="primary"
            handleClick={this.handleCreateProjectButtonClick}
            para="Go ahead and create your first project."
            linkText="Here&rsquo;s how you can add one."
          />
        )}

        <div className="container">
          {project.projects.map((project) => {
            return <ProjectItem key={project.id} project={project} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project,
  projectsLoaded: state.projectsLoading
});

Dashboard.propTypes = {
  project: Proptypes.object.isRequired,
  getAllProjects: Proptypes.func.isRequired
};

export default connect(mapStateToProps, {
  getAllProjects
})(withRouter(Dashboard));
