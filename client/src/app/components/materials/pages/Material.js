import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import withData from '../../../graphql/queries/materials/getMaterial';
import withMutation from '../../../graphql/mutations/materials/deleteMaterial';
import SupplierItem from '../../suppliers/items/SupplierItem';
import DeleteMaterialButton from '../buttons/DeleteMaterialButton';
import UpdateMaterialButton from '../buttons/UpdateMaterialButton';

const Material = ({ material, loading, subscribeToMaterialUpdate }) => {
  if (loading) return <h2>Loading</h2>;
  const {
    id,
    name,
    price,
    metric,
    supplier,
    available,
    description
  } = material;
  if(!id) { return <h1>^Material Not Found</h1> }
  subscribeToMaterialUpdate(id);

  const priceField = () => {
    if(price){
      return (
        <div>
          <label htmlFor="price">Price: </label>
          <p id="price">{ price }€</p>
        </div>
      )
    }
  }

  const supplierField = () => {
    if(supplier){
      const { id, name } = supplier;
      return (
        <div>
          <label htmlFor="supplier">Supplier: </label>
          <Link to={`/suppliers/${id}`} className="btn-link"> {name || id} </Link>
        </div>
      )
    }
  }

  const availableField = () => {
    if(available){
      return (
        <div>
          <label htmlFor="available">Available: </label>
          <p id="available">{ `${available}  ${metric}` }</p>
        </div>
      )
    }
  }

  const descriptionField = () => {
    if(description){
      return (
        <div>
          <label htmlFor="description">Description: </label>
          <p id="description">{ description }</p>
        </div>
      )
    }
  }

  return (
    <div>
      <h1>Material: { name || id }</h1>
      { priceField() }
      { supplierField() }
      { availableField() }
      { descriptionField() }
      <DeleteMaterialButton id={id} />
      <UpdateMaterialButton id={id} />
    </div>
  );
};

Material.propTypes = {
  material: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    metric: PropTypes.string,
    price: PropTypes.number,
    available: PropTypes.number,
    description: PropTypes.string,
    supplier: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  }).isRequired,
  loading: PropTypes.bool
};

export default withData(Material);
