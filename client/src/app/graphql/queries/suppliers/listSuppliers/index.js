import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import ADD_SUBSCRIPTION from './add_subscription.graphql';
import UPDATE_SUBSCRIPTION from './update_subscription.graphql';
import REMOVE_SUBSCRIPTION from './remove_subscription.graphql';

const ListSuppliers = graphql(QUERY, {
  name: 'suppliers',
  props: ({ ownProps, suppliers: { loading, ListSuppliers, subscribeToMore, refetch } }) => {
    const props = {
      ...ownProps,
      loading: loading || false,
      suppliers: ListSuppliers || [],
      subscribeToSupplierAdd: () => {
        return subscribeToMore({
            document: ADD_SUBSCRIPTION,
            updateQuery: (prev, { data }) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToSupplierUpdate: () => {
        return subscribeToMore({
            document: UPDATE_SUBSCRIPTION,
            updateQuery: (prev, { data }) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToSupplierRemove: () => {
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

export default ListSuppliers;
