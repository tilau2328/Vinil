import React, { PropTypes } from 'react';
import ClientItem from '../items/ClientItem';

const ClientList = ({ clients }) => {
  if(!clients) { return <div />; }
  return (
    <ul>
      { clients.map((client) => <ClientItem key={client.id} client={client} /> ) }
    </ul>
  );
};

ClientList.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  )
};

export default ClientList;
