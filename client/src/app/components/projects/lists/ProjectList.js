import React, { PropTypes } from 'react';
import ProjectItem from '../items/ProjectItem';

const ProjectList = ({ projects }) => {
  if(!projects) { return <div />; }
  return (
    <ul>
      { projects.map((project) => <ProjectItem key={project.id} project={project} /> ) }
    </ul>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  )
};

export default ProjectList;
