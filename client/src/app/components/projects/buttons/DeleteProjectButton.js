import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/projects/deleteProject';

class DeleteProjectButton extends Component {
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
    if(this.state.complete) { return <Redirect to='/projects' />; }
    return (
      <div>
        <button className="btn" onClick={this.onClick.bind(this)}>
          { this.props.loading ? 'Loading...' : 'Delete Project' }
        </button>
        <p>{ this.state.error }</p>
      </div>
    );
  };
}

DeleteProjectButton.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

export default withMutation(DeleteProjectButton);
