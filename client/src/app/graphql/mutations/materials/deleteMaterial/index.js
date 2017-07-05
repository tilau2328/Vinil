import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const DeleteMaterial = graphql(MUTATION, {
  options: (props) => ({
    updateQueries: {
      ListMaterials: (previousData, { mutationResult: { data: { DeleteMaterial } } }) => {
        var materials = previousData.ListMaterials;
        if(materials && materials.length){
          const index = materials.findIndex((material) => { return DeleteMaterial == material.id.toString(); });
          materials.splice(index, 1);
        }
        return {
          ...previousData,
          ListMaterials: materials
        };
      }
    }
  })
});

export default DeleteMaterial;
