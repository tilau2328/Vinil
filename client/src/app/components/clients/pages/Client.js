import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import withData from '../../../graphql/queries/clients/getClient';
import ProjectList from '../../projects/lists/ProjectList';
import DeleteClientButton from '../buttons/DeleteClientButton';
import UpdateClientButton from '../buttons/UpdateClientButton';

const Client = ({ client, loading, subscribeToClientUpdate, subscribeToClientDelete, subscribeToProjectUpdate }) => {
  if (loading) return <h2>Loading</h2>;
  const {
    name, id, projects
  } = client;
  if(!id) { return <Redirect to='/clients' />; }
  subscribeToClientUpdate(id);
  subscribeToClientDelete(id);
  subscribeToProjectUpdate(id);

  return (
    <div>
      <h1>Client: { name || id }</h1>
      { projects && projects.length ? <label>Projects</label> : null }
      <ProjectList projects={projects}/>
      <DeleteClientButton id={id} />
      <UpdateClientButton id={id} />
    </div>
  );
};

Client.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string
      }).isRequired
    )
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(Client);
