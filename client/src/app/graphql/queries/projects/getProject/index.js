import { graphql } from 'react-apollo';
import QUERY from './query.graphql';

const GetProject = graphql(QUERY, {
  options: (props) => {
    var id = '';
    if(props.id) id = props.id;
    else if(props.match && props.match.params && props.match.params.id) id = props.match.params.id;
    return { variables: { id } }
  },
  props: ({ ownProps, data: { loading, GetProject } }) => {
    const props = {
      loading: loading || false,
      project: GetProject || { id: '', name: '', cost: 0, description: '', client: null, materials: [] },
      ...ownProps
    };
    return props;
  }
});

export default GetProject;
