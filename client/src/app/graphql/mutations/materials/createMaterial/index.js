import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const CreateMaterial = graphql(MUTATION, {
  options: (props) => ({
    updateQueries: {
      ListMaterials: (previousData, { mutationResult: { data: { CreateMaterial } } }) => {
        return {
          ...previousData,
          ListMaterials: [ ...previousData.ListMaterials, CreateMaterial ]
        };
      }
    }
  })
});

export default CreateMaterial;
