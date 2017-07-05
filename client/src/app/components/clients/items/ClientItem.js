import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const ClientItem = ({ client: { name, id } }) => {
  return (
    <li><Link className="btn btn-link" to={"/clients/"+id} > { name || id } </Link></li>
  );
};

ClientItem.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  })
};

export default ClientItem;
