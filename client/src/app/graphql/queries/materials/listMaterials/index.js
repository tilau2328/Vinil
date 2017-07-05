import { graphql } from 'react-apollo';
import QUERY from './query.graphql';

const ListMaterials = graphql(QUERY, {
  props: ({ ownProps, data: { loading, ListMaterials } }) => {
    const props = {
      loading,
      materials: ListMaterials || [],
      ...ownProps
    };
    return props;
  }
});

export default ListMaterials;
