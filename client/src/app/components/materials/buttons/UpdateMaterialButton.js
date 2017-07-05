import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router';

class UpdateMaterialButton extends Component {
  constructor(props){
    super(props);
    this.state = { clicked: false };
  }

  onClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    const id = this.props.id;
    if(this.state.clicked) { return <Redirect to={`/materials/${id}/edit`} />; }
    return (
      <button className="btn" onClick={this.onClick.bind(this)}>
        Update Material
      </button>
    );
  };
}

UpdateMaterialButton.propTypes = {
  id: PropTypes.string.isRequired
};

export default UpdateMaterialButton;
