import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import SUBSCRIPTION from './subscription.graphql';

const GetClient = graphql(QUERY, {
  options: (props) => {
    var id = '';
    if(props.id) id = props.id;
    else if(props.match && props.match.params && props.match.params.id) id = props.match.params.id;
    return { variables: { id } }
  },
  props: ({ ownProps, data: { loading, GetClient } }) => {
    const props = {
      ...ownProps,
      loading: loading || false,
      client: GetClient || { id: '', name: '', projects: [] },
      subscribeToClientUpdate: params => {
        return props.client.subscribeToMore({
            document: SUBSCRIPTION,
            variables: {
                id: params.id,
            },
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                const client = subscriptionData.data.ClientUpdate;
                return Object.assign({}, prev, client);
            }
        });
      }
    };
    return props;
  }
});

export default GetClient;
