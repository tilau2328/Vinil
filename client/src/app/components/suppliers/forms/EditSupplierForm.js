import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/suppliers/updateSupplier';

class EditSupplierForm extends Component {
  constructor(props){
    super(props);
    const { name } = this.props.supplier;

    this.state = {
      complete: false,
      error: '',
      name
    };
  }

  handleNameChange(event){ this.setState({ name: event.target.value, error: '' }); }
  nameInput(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="supplierNameInput">Name</label>
          <input
            type="text"
            name="name"
            id="supplierNameInput"
            className="form-control"
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.mutate({
      variables: {
        id: this.props.supplier.id,
        name: this.state.name
      }
    })
    .then(() => this.setState({ complete: true }))
    .catch((error) => this.setState({ error }));
  }

  submitButton(){
    return (
      <div className="row">
        <div className="col-4">
          <button
            action="submit"
            className="btn btn-primary"
          >Update</button>
        </div>
      </div>
    );
  }

  errorMessage(){
    return (<p>{this.state.error}</p>);
  }

  render(){
    const id = this.props.supplier.id;
    if(this.state.complete) { return <Redirect to={`/suppliers/${id}`} />; }
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="col-sm-6">
        { this.nameInput() }
        { this.errorMessage() }
        { this.submitButton() }
      </form>
    );
  };
}

EditSupplierForm.propTypes = {
  supplier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withMutation(EditSupplierForm);
