import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/projects/addMaterial';
import MaterialSelect from '../selects/MaterialSelect';

class CreateMaterialForm extends Component {
  constructor(props){
    super(props);
    const { filter_list } = props;

    this.state = {
      quantity: 0,
      material: '',
      error: '',
      filter_list
    };
  }

  componentDidUpdate(){
    if(this.state.filter_list.length !== this.props.filter_list.length)
      this.setState({ filter_list: this.props.filter_list });
  }

  handleQuantityChange(event){ this.setState({ quantity: event.target.value, error: '' }); }
  onMaterialChange(material){
    this.setState({ material });
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
        quantity,
        project: this.props.id
      }
    })
    .then(() => this.setState({
      quantity: 0,
      material: null
    }))
    .catch((error) => this.setState({ error }));
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} className="col-sm-2">
          <div className="form-group">
            <input
              type="number"
              name="quantity"
              pattern="[0-9]*"
              id="quantityInput"
              className="form-control"
              value={this.state.name}
              onChange={this.handleQuantityChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <MaterialSelect
              filter_list={this.state.filter_list}
              onChange={this.onMaterialChange.bind(this)}
            />
          </div>
          <button
            action="submit"
            className="btn btn-primary"
          >Add Material</button>
          <p>{this.state.error}</p>
        </form>
      </div>
    );
  };
}

CreateMaterialForm.propTypes = {
  loading: PropTypes.bool
};

export default withMutation(CreateMaterialForm);
