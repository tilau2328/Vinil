import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const UpdateSupplier = graphql(MUTATION, {
  options: (props) => ({
    update: (proxy, { data: { UpdateSupplier } }) => {

    }
  })
});

export default UpdateSupplier;
