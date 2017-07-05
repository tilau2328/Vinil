import React, { PropTypes } from 'react';
import withData from '../../../graphql/queries/materials/getMaterial';
import EditMaterialForm from '../forms/EditMaterialForm';

const EditMaterial = ({ material, loading }) => {
  if (loading) return <h2>Loading</h2>;

  return (
    <div className="col-sm-offset-4">
      <h1>Edit Material</h1>
      <EditMaterialForm material={material} />
    </div>
  );
};

EditMaterial.propTypes = {
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

export default withData(EditMaterial);
