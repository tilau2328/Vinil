import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/projects/createProject';
import ClientSelect from '../../clients/selects/ClientSelect';

class CreateProjectForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      complete: false,
      id: '',
      cost: 0,
      name: '',
      description: '',
      client: null,
      error: ''
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

  handleCostChange(event){ this.setState({ cost: parseInt(event.target.value), error: '' }); }
  costInput(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="costInput">Cost</label>
          <div className="input-group">
            <input
              name="cost"
              type="number"
              id="costInput"
              value={this.state.cost}
              className="form-control"
              onChange={this.handleCostChange.bind(this)}
            />
            <div className="input-group-addon">€</div>
          </div>
        </div>
      </div>
    );
  }

  onClientChange(client){
    this.setState({ client });
  }

  clientSelect(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="clientInput">Client</label>
          <ClientSelect onChange={this.onClientChange.bind(this)} />
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
            className="form-control"
            id="descriptionInput"
            value={this.state.description}
            onChange={this.handleDescriptionChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.mutate({
      variables: {
        name: this.state.name,
        cost: this.state.cost,
        client: this.state.client,
        description: this.state.description
      }
    })
    .then(({ data: { CreateProject: { id }}}) => {
      this.setState({ complete: true, id });
    })
    .catch((error) => this.setState({ error }));
  }

  submitButton(){
    return (
      <div className="row">
        <div className="col-4">
          <button
            action="submit"
            className="btn btn-primary"
          >Create</button>
        </div>
      </div>
    );
  }

  errorMessage(){
    return (<p>{this.state.error}</p>);
  }

  render(){
    const id = this.state.id;
    if(this.state.complete) { return <Redirect to={`/projects/${id}`} />; }
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="col-sm-6">
        { this.nameInput() }
        { this.costInput() }
        { this.clientSelect() }
        { this.descriptionInput() }
        { this.errorMessage() }
        { this.submitButton() }
      </form>
    );
  };
}

CreateProjectForm.propTypes = {
  loading: PropTypes.bool
};

export default withMutation(CreateProjectForm);
