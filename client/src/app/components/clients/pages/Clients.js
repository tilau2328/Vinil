import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import withData from '../../../graphql/queries/clients/listClients';
import ClientList from '../lists/ClientList';

const Clients = ({ clients, loading, subscribeToClientAdd, subscribeToClientRemove }) => {
  if (loading) return <h2>Loading</h2>;
  subscribeToClientRemove();
  subscribeToClientAdd();
  return (
    <div>
      <h1>Clients</h1>
      <Link to={`/create_client`} className="btn-link">Create</Link>
      <ClientList clients={clients}/>
    </div>
  );
};

Clients.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(Clients);
