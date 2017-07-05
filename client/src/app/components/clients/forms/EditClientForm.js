import React, { Component } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/clients/updateClient';

class EditClientForm extends Component {
  constructor(props){
    super(props);
    const { name } = this.props.client;

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

  handleSubmit(event){
    event.preventDefault();
    this.props.mutate({
      variables: {
        id: this.props.client.id,
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
    const id = this.props.client.id;
    if(this.state.complete) { return <Redirect to={`/clients/${id}`} />; }
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="col-sm-6">
        { this.nameInput() }
        { this.errorMessage() }
        { this.submitButton() }
      </form>
    );
  };
}

export default withMutation(EditClientForm);
