import { graphql } from 'react-apollo';
import QUERY from './query.graphql';

const ListSuppliers = graphql(QUERY, {
  props: ({ ownProps, data: { loading, ListSuppliers } }) => {
    const props = {
      loading: loading || false,
      suppliers: ListSuppliers || [],
      ...ownProps
    };
    return props;
  }
});

export default ListSuppliers;
