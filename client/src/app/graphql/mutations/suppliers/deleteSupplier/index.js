import { graphql } from 'react-apollo';
import MUTATION from './mutation.graphql';

const DeleteSupplier = graphql(MUTATION, {
  options: (props) => ({
    updateQueries: {
      ListSuppliers: (previousData, { mutationResult: { data: { DeleteSupplier } } }) => {
        var suppliers = previousData.ListSuppliers;
        if(suppliers && suppliers.length){
          const index = suppliers.findIndex((supplier) => { return DeleteSupplier == supplier.id.toString(); });
          suppliers.splice(index, 1);
        }
        return {
          ...previousData,
          ListSuppliers: suppliers
        };
      }
    }
  })
});

export default DeleteSupplier;
