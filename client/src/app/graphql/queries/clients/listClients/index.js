import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import SUBSCRIPTION from './subscription.graphql';

const ListClients = graphql(QUERY, {
  props: ({ ownProps, data: { loading, ListClients } }) => {
    const props = {
      loading: loading || false,
      clients: ListClients || [],
      ...ownProps
    };
    return props;
  }
});

export default ListClients;
