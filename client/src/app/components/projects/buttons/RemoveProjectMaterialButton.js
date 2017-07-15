import React, { PropTypes, Component } from 'react';
import { Redirect } from 'react-router';
import withMutation from '../../../graphql/mutations/projects/removeMaterial';

class RemoveProjectMaterialButton extends Component {
  onClick = () => {
    const { project, material } = this.props;
    this.props.mutate({ variables: { project, material } })
  };

  render() {
    return (
      <button className="btn" onClick={this.onClick.bind(this)}>
        { this.props.loading ? 'Loading...' : 'Remove' }
      </button>
    );
  };
}

RemoveProjectMaterialButton.propTypes = {
  project: PropTypes.string.isRequired,
  material: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

export default withMutation(RemoveProjectMaterialButton);
