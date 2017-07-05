import React, { Component } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/materials/updateMaterial';
import SupplierSelect from '../../suppliers/selects/SupplierSelect';

class EditMaterialForm extends Component {
  constructor(props){
    super(props);
    const {
      name, supplier, description,
      metric, available, price
     } = this.props.material;

    this.state = {
      complete: false,
      error: '',
      name,
      price,
      metric,
      supplier,
      available,
      description
    };
  }

  handleNameChange(event){ this.setState({ name: event.target.value, error: '' }); }
  nameInput(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            className="form-control"
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  handlePriceChange(event){ this.setState({ price: parseInt(event.target.value), error: '' }); }
  priceInput(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="priceInput">Cost</label>
          <div className="input-group">
            <input
              name="cost"
              type="number"
              id="priceInput"
              value={this.state.price}
              className="form-control"
              onChange={this.handlePriceChange.bind(this)}
            />
            <div className="input-group-addon">€</div>
          </div>
        </div>
      </div>
    );
  }

  handleAvailableChange(event){ this.setState({ available: parseInt(event.target.value), error: '' }); }
  availableInput(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="availableInput">Available</label>
          <input
            type="number"
            name="available"
            className="form-control"
            id="availableInput"
            value={this.state.available}
            onChange={this.handleAvailableChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleMetricChange(event){ this.setState({ metric: event.target.value, error: '' }); }
  metricInput(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="metricInput">Metric</label>
          <input
            type="text"
            name="metric"
            className="form-control"
            id="metricInput"
            value={this.state.metric}
            onChange={this.handleMetricChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleDescriptionChange(event){ this.setState({ description: event.target.value, error: '' }); }
  descriptionInput(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="descriptionInput">Description</label>
          <textarea
            name="description"
            id="descriptionInput"
            className="form-control"
            value={this.state.description}
            onChange={this.handleDescriptionChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  onSupplierChange(supplier){
    this.setState({ supplier });
  }

  supplierSelect(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="supplierInput">Supplier</label>
          <SupplierSelect onChange={this.onSupplierChange.bind(this)} id={this.props.material.supplier.id} />
        </div>
      </div>
    );
  }

  handleSubmit(event){
    event.preventDefault();
    const id = this.props.material.id;
    const { name, price, available, metric, supplier, description } = this.state;
    this.props.mutate({
      variables: {
        id,
        name,
        available,
        metric,
        supplier,
        description
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
    const id = this.props.material.id;
    if(this.state.complete) { return <Redirect to={`/materials/${id}`} />; }
    return (
      <form onSubmit={this.handleSubmit.bind(this)}  className="col-sm-6">
        { this.nameInput() }
        { this.priceInput() }
        { this.availableInput() }
        { this.metricInput() }
        { this.supplierSelect() }
        { this.descriptionInput() }
        { this.errorMessage() }
        { this.submitButton() }
      </form>
    );
  };
}

export default withMutation(EditMaterialForm);
