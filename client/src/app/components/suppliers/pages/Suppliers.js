import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import withData from '../../../graphql/queries/suppliers/listSuppliers';
import SupplierList from '../lists/SupplierList';

const Suppliers = ({ suppliers, loading, subscribeToSupplierAdd, subscribeToSupplierUpdate, subscribeToSupplierRemove }) => {
  if (loading) return <h2>Loading</h2>;
  subscribeToSupplierRemove();
  subscribeToSupplierUpdate();
  subscribeToSupplierAdd();

  return (
    <div>
      <h1>Suppliers</h1>
      <Link to={`/create_supplier`} className="btn-link">Create</Link>
      <SupplierList suppliers={suppliers}/>
    </div>
  );
};

Suppliers.propTypes = {
  suppliers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(Suppliers);
