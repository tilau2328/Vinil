import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import SUBSCRIPTION from './subscription.graphql';

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
            document: SUBSCRIPTION,
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

export default GetProject;
