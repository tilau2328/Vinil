import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import withData from '../../../graphql/queries/projects/listProjects';
import ProjectList from '../lists/ProjectList';

const Projects = ({ projects, loading, subscribeToProjectAdd, subscribeToProjectUpdate, subscribeToProjectRemove }) => {
  if (loading) return <h2>Loading</h2>;
  subscribeToProjectRemove();
  subscribeToProjectUpdate();
  subscribeToProjectAdd();

  return (
    <div>
      <h1>Projects</h1>
      <Link to={`/create_project`} className="btn-link">Create</Link>
      <ProjectList projects={projects}/>
    </div>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(Projects);
