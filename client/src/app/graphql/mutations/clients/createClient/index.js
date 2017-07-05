import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const CreateClient = graphql(MUTATION, {
  options: (props) => ({
    updateQueries: {
      ListClients: (previousData, { mutationResult: { data: { CreateClient } } }) => {
        return {
          ...previousData,
          ListClients: [ ...previousData.ListClients, CreateClient ]
        };
      }
    }
  })
});

export default CreateClient;
