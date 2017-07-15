import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/materials/addMaterial';
import MaterialSelect from '../../suppliers/selects/MaterialSelect';

class UpdateMaterialForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      quantity: 0,
      material: '',
      error: ''
    };
  }

  handleQuantityChange(event){ this.setState({ quantity: event.target.value, error: '' }); }
  nameInput(){
    return (
      <div className="row">
        <div className="col-12">
          <input
            type="number"
            name="quantity"
            id="quantityInput"
            className="form-control"
            value={this.state.name}
            onChange={this.handleQuantityChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleSubmit(event){
    event.preventDefault();
    const {
      material,
      quantity
    } = this.state;
    this.props.mutate({
      variables: {
        material,
        quantity
      }
    })
    .then(() => this.setState({
      quantity: 0,
      material: ''
    })
    .catch((error) => this.setState({ error }));
  }

  errorMessage(){
    return (<p>{this.state.error}</p>);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="col-sm-6">
        { this.quantityInput() }
        { this.submitButton() }
        { this.errorMessage() }
      </form>
    );
  };
}

UpdateMaterialForm.propTypes = {
  loading: PropTypes.bool
};

export default withMutation(UpdateMaterialForm);
