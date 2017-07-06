import { graphql } from 'react-apollo';
import apolloClient from '../../..';
import QUERY from './query.graphql';
import ADD_SUBSCRIPTION from './add_subscription.graphql';
import REMOVE_SUBSCRIPTION from './remove_subscription.graphql';

const ListClients = graphql(QUERY, {
  name: 'clients',
  props: ({ ownProps, clients: { loading, ListClients, subscribeToMore, refetch } }) => {

    const props = {
      loading: loading || false,
      clients: ListClients || [],
      ...ownProps,
      subscribeToClientAdd: () => {
        return subscribeToMore({
            document: ADD_SUBSCRIPTION,
            updateQuery: (prev, { data }) => {
              refetch();
              console.log(data);
              return prev;
            }
        });
      },
      subscribeToClientRemove: () => {
        return subscribeToMore({
            document: REMOVE_SUBSCRIPTION,
            updateQuery: (prev, { data }) => {
              refetch();
              return prev;
            }
        });
      }
    };
    return props;
  }
});

export default ListClients;
