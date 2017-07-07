import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import withData from '../../../graphql/queries/projects/getProject';
import withMutation from '../../../graphql/mutations/projects/deleteProject';
import ProjectMaterialList from '../../materials/lists/ProjectMaterialList';
import DeleteProjectButton from '../buttons/DeleteProjectButton';
import UpdateProjectButton from '../buttons/UpdateProjectButton';
import ClientItem from '../../clients/items/ClientItem';

const Project = ({ project, loading, subscribeToProjectUpdate, subscribeToProjectDelete }) => {
  if (loading) return <h2>Loading</h2>;
  const {
    id, name, cost,
    client, description,
    materials
  } = project;
  if(!id) { return <Redirect to='/projects' />; }
  subscribeToProjectUpdate(id);
  subscribeToProjectDelete(id);
  return (
    <div>
      <h1>Project: { name || id }</h1>
      <p>Cost { cost }€</p>
      { client ? <label>Client: </label> : null }
      { client ? <ClientItem client={client} /> : null }
      { description ? <label>Description: </label> : null}
      { description ? <p>{ description }</p> : null }
      { materials && materials.length ? <label>Materials: </label> : null }
      { materials && materials.length ? <ProjectMaterialList materials={materials}/> : null }
      <DeleteProjectButton id={id} />
      <UpdateProjectButton id={id} />
    </div>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
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

export default withData(Project);
