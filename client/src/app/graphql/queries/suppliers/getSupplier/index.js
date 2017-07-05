import { graphql } from 'react-apollo';
import QUERY from './query.graphql';

const GetSupplier = graphql(QUERY, {
  options: (props) => {
    var id = '';
    if(props.id) id = props.id;
    else if(props.match && props.match.params && props.match.params.id) id = props.match.params.id;
    return { variables: { id } }
  },
  props: ({ ownProps, data: { loading, GetSupplier } }) => {
    const props = {
      loading: loading || false,
      supplier: GetSupplier || { id: '', name: '', materials: [] },
      ...ownProps
    };
    return props;
  }
});

export default GetSupplier;
