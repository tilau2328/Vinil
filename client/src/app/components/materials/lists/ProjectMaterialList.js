import React, { PropTypes } from 'react';
import ProjectMaterialItem from '../items/ProjectMaterialItem';

const ProjectMaterialList = ({ materials, project }) => {
  return (
    <ul>
      { materials.map((material) => <ProjectMaterialItem key={material.material.id} project_material={material} project={project}/> ) }
    </ul>
  );
};

ProjectMaterialList.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      material: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
      quantity: PropTypes.number
    }).isRequired
  ).isRequired
};

export default ProjectMaterialList;
