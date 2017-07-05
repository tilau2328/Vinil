import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const SupplierItem = ({ supplier: { name, id } }) => {
  return (
    <li><Link className="btn btn-link" to={ "/suppliers/" + id } > { name || id } </Link></li>
  );
};

SupplierItem.propTypes = {
  supplier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  })
};

export default SupplierItem;
