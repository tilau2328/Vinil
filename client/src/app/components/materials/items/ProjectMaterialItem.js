import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const ProductMaterialItem = ({ project_material }) => {
  const { material:, quantity } = project_material;
  return (
    <li>
      {quantity}
      <Link
        className="btn btn-link"
        to={"/materials/"+id}
      > {name || id} </Link>
    </li>
  );
};

ProductMaterialItem.propTypes = {
  project_material: PropTypes.shape({
    material: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    quantity: PropTypes.string.isRequired
  }).isRequired
};

export default ProductMaterialItem;
