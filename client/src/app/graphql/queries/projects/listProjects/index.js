import { graphql } from 'react-apollo';
import QUERY from './query.graphql';

const ListProjects = graphql(QUERY, {
  props: ({ ownProps, data: { loading, ListProjects } }) => {
    const props = {
      loading,
      projects: ListProjects || [],
      ...ownProps
    };
    return props;
  }
});

export default ListProjects;
