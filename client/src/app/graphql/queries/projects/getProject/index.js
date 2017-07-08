import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import UPDATE_SUBSCRIPTION from './update_subscription.graphql';
import DELETE_SUBSCRIPTION from './delete_subscription.graphql';
import CLIENT_UPDATE_SUBSCRIPTION from './client_update_subscription.graphql';
import MATERIAL_UPDATE_SUBSCRIPTION from './material_update_subscription.graphql';

const GetProject = graphql(QUERY, {
  name: 'project',
  options: (props) => {
    var id = '';
    if(props.id) id = props.id;
    else if(props.match && props.match.params && props.match.params.id) id = props.match.params.id;
    return { variables: { id } }
  },
  props: ({ ownProps, project: { loading, GetProject, subscribeToMore, refetch } }) => {
    const props = {
      ...ownProps,
      loading: loading || false,
      project: GetProject || { id: '', name: '', cost: 0, description: '', client: null, materials: [] },
      subscribeToProjectUpdate: params => {
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
      subscribeToProjectDelete: params => {
        if(!params) return;
        return subscribeToMore({
            document: DELETE_SUBSCRIPTION,
            variables: { id: params },
            updateQuery: (prev) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToClientUpdate: params => {
        if(!params) return;
        return subscribeToMore({
            document: CLIENT_UPDATE_SUBSCRIPTION,
            variables: { id: params },
            updateQuery: (prev) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToMaterialUpdate: params => {
        if(!params) return;
        return subscribeToMore({
            document: MATERIAL_UPDATE_SUBSCRIPTION,
            variables: { materials: params },
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

export default GetProject;
