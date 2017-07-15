import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const UpdateProject = graphql(MUTATION, {
  options: (props) => ({
    update: (proxy, { data: { UpdateProject } }) => {

    }
  })
});

export default UpdateProject;
