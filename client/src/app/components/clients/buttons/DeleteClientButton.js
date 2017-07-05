import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/clients/deleteClient';

class DeleteClientButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      complete: false,
      error: ''
    };
  }

  onClick = () => {
    const { id } = this.props;
    this.props.mutate({ variables: { id } })
    .then(() => this.setState({ complete: true }))
    .catch((error) => this.setState({ error }));
  };

  render() {
    if(this.state.complete) { return <Redirect to='/clients' />; }
    return (
      <div>
        <button className="btn" onClick={this.onClick.bind(this)}>
          { this.props.loading ? 'Loading...' : 'Delete Client' }
        </button>
        <p>{ this.state.error }</p>
      </div>
    );
  };
}

DeleteClientButton.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

export default withMutation(DeleteClientButton);
