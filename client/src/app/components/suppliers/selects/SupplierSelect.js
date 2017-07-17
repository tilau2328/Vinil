import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import withData from '../../../graphql/queries/suppliers/listSuppliers';

class SupplierSelect extends Component {
  constructor(props){
    super(props);
    const {
      subscribeToSupplierAdd,
      subscribeToSupplierUpdate,
      subscribeToSupplierRemove
    } = props;
    subscribeToSupplierRemove();
    subscribeToSupplierUpdate();
    subscribeToSupplierAdd();
    this.state = { supplier: null };
  }

  componentDidUpdate() {
    const { id, suppliers, loading } = this.props;
    if(!loading && !this.state.supplier){
      var new_supplier;
      if(id){ new_supplier = id; }
      else if(suppliers.length > 0) {
        new_supplier = suppliers[0].id;
      } else { return; }
      this.setState({ supplier: new_supplier });
      this.props.onChange(new_supplier);
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
    this.setState({ supplier: event.value });
    this.props.onChange(event.value);
  }

  render() {
    const { loading, suppliers, onChange, id } = this.props;
    if (loading || !suppliers) return <div />;
    const options = this.listToOptions(suppliers);
    options.push({ value: null, label: "" });
    return (
      <Select
        id="supplierInput"
        name="supplier"
        ref="supplierSelect"
        value={this.state.supplier}
        searchable={true}
        isLoading={loading}
        options={options}
        onChange={this.onChange.bind(this)}
      />
    );
  };
}

SupplierSelect.propTypes = {
  suppliers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  ),
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withData(SupplierSelect);
