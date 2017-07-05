import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const UpdateClient = graphql(MUTATION, {
  options: (props) => ({
    update: (proxy, { data: { UpdateClient } }) => {

    }
  })
});

export default UpdateClient;
