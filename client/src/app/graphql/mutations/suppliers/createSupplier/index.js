import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const CreateSupplier = graphql(MUTATION, {
  options: (props) => ({
    updateQueries: {
      ListSuppliers: (previousData, { mutationResult: { data: { CreateSupplier } } }) => {
        return {
          ...previousData,
          ListSuppliers: [ ...previousData.ListSuppliers, CreateSupplier ]
        };
      }
    }
  })
});

export default CreateSupplier;
