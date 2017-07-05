import React, { PropTypes } from 'react';
import withData from '../../../graphql/queries/suppliers/getSupplier';
import EditSupplierForm from '../forms/EditSupplierForm';

const EditSupplier = ({ loading, supplier }) => {
  if (loading) return <h2>Loading</h2>;
  const { id, name, materials } = supplier;
  return (
    <div className="col-sm-offset-4">
      <h1>Edit Supplier</h1>
      <EditSupplierForm supplier={supplier}/>
    </div>
  );
};

EditSupplier.propTypes = {
  supplier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(EditSupplier);
