import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const RemoveProject = graphql(MUTATION, {
  options: (props) => ({
    update: (proxy, { data: { RemoveProject } }) => {

    }
  })
});

export default RemoveProject;
