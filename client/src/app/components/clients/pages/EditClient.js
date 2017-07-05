import React, { PropTypes } from 'react';
import withData from '../../../graphql/queries/clients/getClient';
import EditClientForm from '../forms/EditClientForm';

const EditClient = ({ client, loading }) => {
  if (loading) return <h2>Loading</h2>;
  return (
    <div className="col-sm-offset-4">
      <h1>Edit Client</h1>
      <EditClientForm client={client} />
    </div>
  );
};

EditClient.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(EditClient);
