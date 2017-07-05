import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/suppliers/deleteSupplier';

class DeleteSupplierButton extends Component {
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
    if(this.state.complete) { return <Redirect to='/suppliers' />; }
    return (
      <div>
        <button className="btn" onClick={this.onClick.bind(this)}>
          { this.props.loading ? 'Loading...' : 'Delete Supplier' }
        </button>
        <p>{ this.state.error }</p>
      </div>
    );
  };
}

DeleteSupplierButton.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

export default withMutation(DeleteSupplierButton);
