import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import ADD_SUBSCRIPTION from './add_subscription.graphql';
import UPDATE_SUBSCRIPTION from './update_subscription.graphql';
import REMOVE_SUBSCRIPTION from './remove_subscription.graphql';

const ListMaterials = graphql(QUERY, {
  name: 'materials',
  props: ({ ownProps, materials: { loading, ListMaterials, subscribeToMore, refetch } }) => {
    const props = {
      ...ownProps,
      loading: loading || false,
      materials: ListMaterials || [],
      subscribeToMaterialAdd: () => {
        return subscribeToMore({
            document: ADD_SUBSCRIPTION,
            updateQuery: (prev, { data }) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToMaterialUpdate: () => {
        return subscribeToMore({
            document: UPDATE_SUBSCRIPTION,
            updateQuery: (prev, { data }) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToMaterialRemove: () => {
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

export default ListMaterials;
