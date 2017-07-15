import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import RemoveProjectMaterialButton from '../../projects/buttons/RemoveProjectMaterialButton';

class ProductMaterialItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      update: false
    }
  }

  render(){
    const { project_material, project } = this.props;
    const { material: { id, name }, quantity } = project_material;

    return (
      <li>
        { this.state.update ? (
          <button  className="btn" onClick={() => this.setState({ update: false })}>
            Cancel
          </button>
        ) : (
          <div>
            {quantity}
            <Link
              className="btn btn-link"
              to={"/materials/"+id}
            > {name || id} </Link>
            <RemoveProjectMaterialButton project={project} material={id} />
            <button  className="btn" onClick={() => this.setState({ update: true })}>
              Update
            </button>
          </div>
        )}
      </li>
    );
  }
};

ProductMaterialItem.propTypes = {
  project_material: PropTypes.shape({
    material: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired,
    quantity: PropTypes.number
  }).isRequired
};

export default ProductMaterialItem;
