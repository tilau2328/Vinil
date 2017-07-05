import React, { PropTypes } from 'react';
import MaterialItem from '../items/MaterialItem';

const MaterialList = ({ materials }) => {
  if(!materials) { return <div />; }
  return (
    <ul>
      { materials.map((material) => <MaterialItem key={material.id} material={material} /> ) }
    </ul>
  );
};

MaterialList.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  )
};

export default MaterialList;
