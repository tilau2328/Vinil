import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const CreateProject = graphql(MUTATION, {
  options: (props) => ({
    updateQueries: {
      ListProjects: (previousData, { mutationResult: { data: { CreateProject } } }) => {
        return {
          ...previousData,
          ListProjects: [ ...previousData.ListProjects, CreateProject ]
        };
      }
    }
  })
});

export default CreateProject;
