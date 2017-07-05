import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const DeleteClient = graphql(MUTATION, {
  options: (props) => ({
    updateQueries: {
      ListClients: (previousData, { mutationResult: { data: { DeleteClient } } }) => {
        var clients = previousData.ListClients;
        if(clients && clients.length){
          const index = clients.findIndex((client) => { return DeleteClient == client.id.toString(); });
          clients.splice(index, 1);
        }
        return {
          ...previousData,
          ListClients: clients
        };
      }
    }
  })
});

export default DeleteClient;
