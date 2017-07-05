import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router';

class UpdateClientButton extends Component {
  constructor(props){
    super(props);
    this.state = { clicked: false };
  }

  onClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    const id = this.props.id;
    if(this.state.clicked) { return <Redirect to={`/clients/${id}/edit`} />; }
    return (
      <button className="btn" onClick={this.onClick.bind(this)}>
        Update Client
      </button>
    );
  };
}

UpdateClientButton.propTypes = {
  id: PropTypes.string.isRequired
};

export default UpdateClientButton;
