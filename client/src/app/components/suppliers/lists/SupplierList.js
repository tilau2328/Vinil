import React, { PropTypes } from 'react';
import SupplierItem from '../items/SupplierItem';

const SupplierList = ({ suppliers }) => {
  if(!suppliers) { return <div />; }
  return (
    <ul>
      { suppliers.map((supplier) => <SupplierItem key={supplier.id} supplier={supplier} /> ) }
    </ul>
  );
};

SupplierList.propTypes = {
  suppliers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  )
};

export default SupplierList;
