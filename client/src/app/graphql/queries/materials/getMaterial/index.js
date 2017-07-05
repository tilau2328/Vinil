import { graphql } from 'react-apollo';
import QUERY from './query.graphql';

const GetMaterial = graphql(QUERY, {
  options: (props) => {
    var id = '';
    if(props.id) id = props.id;
    else if(props.match && props.match.params && props.match.params.id) id = props.match.params.id;
    return { variables: { id } }
  },
  props: ({ ownProps, data: { loading, GetMaterial } }) => {
    const props = {
      loading: loading || false,
      material: GetMaterial || { id: '', name: '', price: 0, supplier: null, description: '', available: 0, metric: '' },
      ...ownProps
    };
    return props;
  }
});

export default GetMaterial;
