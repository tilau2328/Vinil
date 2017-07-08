import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import withData from '../../../graphql/queries/materials/listMaterials';
import MaterialList from '../lists/MaterialList';

const Materials = ({ materials, loading, subscribeToMaterialAdd, subscribeToMaterialUpdate, subscribeToMaterialRemove }) => {
  if (loading) return <h2>Loading</h2>;
  subscribeToMaterialRemove();
  subscribeToMaterialUpdate();
  subscribeToMaterialAdd();
  return (
    <div>
      <h1>Materials</h1>
      <Link to={`/create_material`} className="btn-link">Create</Link>
      <MaterialList materials={materials}/>
    </div>
  );
};

Materials.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(Materials);
