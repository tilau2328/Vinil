import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import ADD_SUBSCRIPTION from './add_subscription.graphql';
import UPDATE_SUBSCRIPTION from './update_subscription.graphql';
import REMOVE_SUBSCRIPTION from './remove_subscription.graphql';

const ListProjects = graphql(QUERY, {
  name: 'projects',
  props: ({ ownProps, projects: { loading, ListProjects, subscribeToMore, refetch } }) => {
    const props = {
      ...ownProps,
      loading: loading || false,
      projects: ListProjects || [],
      subscribeToProjectAdd: () => {
        return subscribeToMore({
            document: ADD_SUBSCRIPTION,
            updateQuery: (prev, { data }) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToProjectUpdate: () => {
        return subscribeToMore({
            document: UPDATE_SUBSCRIPTION,
            updateQuery: (prev, { data }) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToProjectRemove: () => {
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

export default ListProjects;
