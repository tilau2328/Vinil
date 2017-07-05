import React, { Component } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/projects/updateProject';
import ClientSelect from '../../clients/selects/ClientSelect';

class EditProjectForm extends Component {
  constructor(props){
    super(props);
    const { name, cost, client, description } = this.props.project;

    this.state = {
      complete: false,
      name: name || '',
      cost: cost || 0,
      client: client || null,
      description: description || '',
      error: ''
    };
  }

  handleNameChange(event){ this.setState({ name: parseInt(event.target.value), error: '' }); }
  nameInput(){
    return (
      <div className="row">
        <div className="col-12">
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            value={this.state.name}
            className="form-control"
            onChange={this.handleNameChange.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleCostChange(event){ this.setState({ cost: event.target.value, error: '' }); }
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
          <ClientSelect onChange={this.onClientChange.bind(this)} id={this.props.project.client.id}/>
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
    const {
      name, cost, client, description
    } = this.state;
    this.props.mutate({
      variables: {
        id: this.props.project.id,
        name: name || '',
        cost: cost || 0,
        client: client || null,
        description: description || ''
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
    const id = this.props.project.id;
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

export default withMutation(EditProjectForm);
