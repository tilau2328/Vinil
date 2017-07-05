import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const MaterialItem = ({ material: { name, id } }) => {
  return (
    <li>
      <Link
        className="btn btn-link"
        to={"/materials/"+id}
      > { name || id } </Link>
    </li>
  );
};

MaterialItem.propTypes = {
  material: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  })
};

export default MaterialItem;
