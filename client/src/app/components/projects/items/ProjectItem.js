import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project: { name, id } }) => {
  return (
    <li><Link className="btn btn-link" to={"/projects/"+id} > { name || id } </Link></li>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  })
};

export default ProjectItem;
