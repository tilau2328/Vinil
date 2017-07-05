import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const DeleteProject = graphql(MUTATION, {
  options: (props) => ({
    updateQueries: {
      ListProjects: (previousData, { mutationResult: { data: { DeleteProject } } }) => {
        var projects = previousData.ListProjects;
        if(projects && projects.length){
          const index = projects.findIndex((project) => { return DeleteProject == project.id.toString(); });
          projects.splice(index, 1);
        }
        return {
          ...previousData,
          ListProjects: projects
        };
      }
    }
  })
});

export default DeleteProject;
