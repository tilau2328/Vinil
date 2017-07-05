import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/clients/createClient';

class CreateClientForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      complete: false,
      id: '',
      name: '',
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

  handleSubmit(event){
    event.preventDefault();
    this.props.mutate({
      variables: {
        name: this.state.name
      }
    })
    .then(({ data: { CreateClient: { id }}}) => {
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

CreateClientForm.propTypes = {
  loading: PropTypes.bool
};

export default withMutation(CreateClientForm);
