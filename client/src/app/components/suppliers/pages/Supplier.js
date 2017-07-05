import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import withData from '../../../graphql/queries/suppliers/getSupplier';
import MaterialList from '../../materials/lists/MaterialList';
import DeleteSupplierButton from '../buttons/DeleteSupplierButton';
import UpdateSupplierButton from '../buttons/UpdateSupplierButton';

const Supplier = ({ supplier, loading }) => {
  if (loading) return <h2>Loading</h2>;
  const { materials, name, id } = supplier;
  return (
    <div>
      <h1>Supplier: { name || id }</h1>
      { materials ? <label>Materials: </label> : null }
      <MaterialList materials={materials}/>
      <DeleteSupplierButton id={id} />
      <UpdateSupplierButton id={id} />
    </div>
  );
};

Supplier.propTypes = {
  supplier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    materials: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string
      }).isRequired
    )
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(Supplier);