import React, { PropTypes } from 'react';
import withData from '../../../graphql/queries/projects/getProject';
import EditProjectForm from '../forms/EditProjectForm';

const EditProject = ({ project, loading }) => {
  if (loading) return <h2>Loading</h2>;
  return (
    <div className="col-sm-offset-4">
      <h1>Edit Project</h1>
      <EditProjectForm project={project} />
    </div>
  );
};

EditProject.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    cost: PropTypes.number,
    client: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }),
    materials: PropTypes.arrayOf(
      PropTypes.shape({
        material: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string
        }).isRequired,
        quantity: PropTypes.number
      }).isRequired
    )
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(EditProject);
