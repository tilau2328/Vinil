import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import withData from '../../../graphql/queries/materials/listMaterials';

class MaterialSelect extends Component {
  constructor(props){
    super(props);
    const {
      filter_list,
      subscribeToMaterialRemove,
      subscribeToMaterialUpdate,
      subscribeToMaterialAdd
    } = props;

    subscribeToMaterialRemove();
    subscribeToMaterialUpdate();
    subscribeToMaterialAdd();
    this.state = {
      filter_list,
      material: null,
      materials: [],
      options: []
    }
  }

  componentDidUpdate(){
    const { filter_list, id, materials } = this.props;
    const list = filter_list ? materials.filter(({ id }) => filter_list.indexOf(id) == -1) : materials;
    const options = this.listToOptions(list);

    if(!filter_list || list.length != this.state.materials.length){ this.setState({ materials: list, options }); }
    if(!list.length) {
      if(!this.state.material) return;
      this.setState({ material: new_material });
      this.props.onChange(new_material);
    } else if(!this.state.material || list.findIndex((item) => { return item.id == this.state.material; }) == -1){
      var new_material;
      if(id && list.findIndex((item) => { return item.id == id; }) != -1){ new_material = id; }
      else if(list.length > 0) { new_material = list[0].id; }
      else { return; }
      this.setState({ material: new_material });
      this.props.onChange(new_material);
    }
  }

  listToOptions(list){
    return list.map(({ id, name }) => {
      return { value: id, label: name };
    });
  }

  onChange(event){
    if(event && event.value == undefined) { return; }
    var value = event ? event.value : null;
    this.setState({ material: value });
    this.props.onChange(value);
  }

  render() {
    const { loading, onChange, id } = this.props;
    const { materials, material, options } = this.state;
    if (loading || !materials) return <div />;
    return (
      <Select
        name = "material"
        ref="materialSelect"
        value={material}
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
