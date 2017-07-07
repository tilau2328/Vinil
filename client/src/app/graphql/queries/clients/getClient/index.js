import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import UPDATE_SUBSCRIPTION from './update_subscription.graphql';
import DELETE_SUBSCRIPTION from './delete_subscription.graphql';

const GetClient = graphql(QUERY, {
  name: 'client',
  options: (props) => {
    var id = '';
    if(props.id) id = props.id;
    else if(props.match && props.match.params && props.match.params.id) id = props.match.params.id;
    return { variables: { id } }
  },
  props: ({ ownProps, client: { loading, GetClient, subscribeToMore, refetch } }) => {
    const props = {
      ...ownProps,
      loading: loading || false,
      client: GetClient || { id: '', name: '', projects: [] },
      subscribeToClientUpdate: params => {
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
      subscribeToClientDelete: () => {
        return subscribeToMore({
            document: DELETE_SUBSCRIPTION,
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

export default GetClient;
