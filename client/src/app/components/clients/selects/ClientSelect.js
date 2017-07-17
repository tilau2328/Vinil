import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import withData from '../../../graphql/queries/clients/listClients';

class ClientSelect extends Component {
  constructor(props){
    super(props);
    const {
      subscribeToClientAdd,
      subscribeToClientUpdate,
      subscribeToClientRemove
    } = props;
    subscribeToClientAdd();
    subscribeToClientUpdate();
    subscribeToClientRemove();
    this.state = {
      client: null
    }
  }

  listToOptions(list){
    return list.map(({ id, name }) => {
      return { value: id, label: name || id };
    });
  }

  componentDidUpdate() {
    const { id, clients, loading } = this.props;
    if(!loading && !this.state.client){
      var new_client;
      if(id){ new_client = id; }
      else if(clients.length > 0) {
        new_client = clients[0].id;
      } else { return; }
      this.setState({ client: new_client });
      this.props.onChange(new_client);
    }
  }

  onChange(event){
    if(event && event.value == undefined) { return; }
    var value = event ? event.value : null;
    this.setState({ client: value });
    this.props.onChange(value);
  }

  render() {
    const { loading, clients, onChange, id } = this.props;
    if (loading || !clients) return <div />;
    const options = this.listToOptions(clients);
    return (
      <Select
        name = "client"
        ref="clientSelect"
        value={this.state.client}
        searchable={true}
        isLoading={loading}
        options={options}
        onChange={this.onChange.bind(this)}
      />
    );
  };
}

ClientSelect.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  ),
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default withData(ClientSelect);
