import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import withData from '../../../graphql/queries/materials/listMaterials';

class MaterialSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      material: null
    }
  }

  componentDidUpdate() {
    const { id, materials, loading } = this.props;
    if(!loading && !this.state.material){
      var new_material;
      if(id){ new_material = id; }
      else if(materials.length > 0) {
        new_material = materials[0].id;
      } else { return; }
      this.setState({ material: new_material });
      this.props.onChange(new_material);
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
    this.setState({ material: value });
    this.props.onChange(value);
  }

  render() {
    const { loading, materials, onChange, id } = this.props;
    if (loading || !materials) return <div />;
    const options = this.listToOptions(materials);
    return (
      <Select
        name = "material"
        ref="materialSelect"
        value={this.state.material}
        searchable={true}
        isLoading={loading}
        options={options}
        onChange={this.onChange.bind(this)}
      />
    );
  };
}

MaterialSelect.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  ),
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(MaterialSelect);
