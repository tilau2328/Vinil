import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import withData from '../../../graphql/queries/projects/getProject';
import withMutation from '../../../graphql/mutations/projects/deleteProject';
import ProjectMaterialList from '../../materials/lists/ProjectMaterialList';
import AddProjectMaterialForm from '../../materials/forms/AddProjectMaterialForm';
import DeleteProjectButton from '../buttons/DeleteProjectButton';
import UpdateProjectButton from '../buttons/UpdateProjectButton';
import ClientItem from '../../clients/items/ClientItem';

class Project extends Component {
  constructor(props){
    super(props);
    this.state = {
      filter_list: this.props.project.materials
        ? this.props.project.materials.map(({material}) => material.id.toString())
        : []
      }
  }

  componentDidUpdate(){
    if(this.state.filter_list.length !== this.props.project.materials.length)
      this.setState({ filter_list: this.props.project.materials.map(({material}) => material.id.toString()) });
  }

  render() {
    const {
      loading,
      project,
      subscribeToProjectUpdate,
      subscribeToProjectDelete,
      subscribeToClientUpdate,
      subscribeToMaterialUpdate
    } = this.props;
    if(loading) return <h2>Loading</h2>;
    const {
      id, name, cost,
      client, description,
      materials
    } = project;
    if(!id) { return <Redirect to='/projects' />; }
    subscribeToProjectUpdate(id);
    subscribeToProjectDelete(id);
    if(client) subscribeToClientUpdate(client);
    if(materials) subscribeToMaterialUpdate(materials.map(({material}) => material));
    console.log(this.state.filter_list);
    return (
      <div>
        <h1>Project: { name || id }</h1>
        <p>Cost { cost }€</p>
        { client ? <label>Client: </label> : null }
        { client ? <ClientItem client={client} /> : null }
        { description ? <label>Description: </label> : null}
        { description ? <p>{ description }</p> : null }
        <div className="row">
          <label>Materials: </label>
          <ProjectMaterialList materials={materials} project={id} />
        </div>
        <div className="row">
          <AddProjectMaterialForm id={id} filter_list={this.state.filter_list}/>
        </div>
        <div className="row">
          <DeleteProjectButton id={id} />
        </div>
        <div className="row">
          <UpdateProjectButton id={id} />
        </div>
      </div>
    );
  }
};

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    client: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    }),
    materials: PropTypes.arrayOf(
      PropTypes.shape({
        material: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string
        }).isRequired,
        quantity: PropTypes.number
      }).isRequired
    )
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(Project);
