import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import withData from '../../graphql/queries/projects/listProjects';

class ProjectSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      project: null
    }
  }

  componentDidUpdate() {
    const { id, projects, loading } = this.props;
    if(!loading && !this.state.project){
      var new_project;
      if(id){ new_project = id; }
      else if(projects.length > 0) {
        new_project = projects[0].id;
      } else { return; }
      this.setState({ project: new_project });
      this.props.onChange(new_project);
    }
  }

  listToOptions(list){
    return list.map(({ id, name }) => {
      return { value: id, label: name };
    });
  }

  onChange({ label, value }){
    if(event && event.value == undefined) { return; }
    var value = event ? event.value : null;
    this.setState({ project: value });
    this.props.onChange(value);
  }

  render() {
    const { loading, projects, onChange, id } = this.props;
    if (loading || !projects) return <div />;
    const options = this.listToOptions(projects);
    return (
      <Select
        name = "project"
        ref="projectSelect"
        value={this.state.project}
        searchable={true}
        isLoading={loading}
        options={options}
        onChange={this.onChange.bind(this)}
      />
    );
  };
}

ProjectSelect.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  ),
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(ProjectSelect);
