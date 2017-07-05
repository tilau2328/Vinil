import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const UpdateMaterial = graphql(MUTATION, {
  options: (props) => ({
    update: (proxy, { data: { UpdateMaterial } }) => {

    }
  })
});

export default UpdateMaterial;
