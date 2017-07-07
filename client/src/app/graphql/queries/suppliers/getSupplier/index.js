import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import UPDATE_SUBSCRIPTION from './update_subscription.graphql';
import DELETE_SUBSCRIPTION from './delete_subscription.graphql';

const GetSupplier = graphql(QUERY, {
  name: 'supplier',
  options: (props) => {
    var id = '';
    if(props.id) id = props.id;
    else if(props.match && props.match.params && props.match.params.id) id = props.match.params.id;
    return { variables: { id } }
  },
  props: ({ ownProps, supplier: { loading, GetSupplier, subscribeToMore, refetch } }) => {
    const props = {
      ...ownProps,
      loading: loading || false,
      supplier: GetSupplier || { id: '', name: '', materials: [] },
      subscribeToSupplierUpdate: params => {
        if(!params) return;
        return subscribeToMore({
            document: UPDATE_SUBSCRIPTION,
            variables: { id: params },
            updateQuery: (prev) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToSupplierDelete: params => {
        if(!params) return;
        return subscribeToMore({
            document: DELETE_SUBSCRIPTION,
            variables: { id: params },
            updateQuery: (prev) => {
              refetch();
              return prev;
            }
        });
      }
    };
    return props;
  }
});

export default GetSupplier;
