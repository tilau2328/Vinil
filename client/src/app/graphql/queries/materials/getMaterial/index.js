import { graphql } from 'react-apollo';
import QUERY from './query.graphql';
import UPDATE_SUBSCRIPTION from './update_subscription.graphql';
import DELETE_SUBSCRIPTION from './delete_subscription.graphql';
import UPDATE_SUPPLIER_SUBSCRIPTION from './update_supplier_subscription.graphql';

const GetMaterial = graphql(QUERY, {
  name: 'material',
  options: (props) => {
    var id = '';
    if(props.id) id = props.id;
    else if(props.match && props.match.params && props.match.params.id) id = props.match.params.id;
    return { variables: { id } }
  },
  props: ({ ownProps, material: { loading, GetMaterial, subscribeToMore, refetch } }) => {
    const props = {
      ...ownProps,
      loading: loading || false,
      material: GetMaterial || { id: '', name: '', price: 0, supplier: null, description: '', available: 0, metric: '' },
      subscribeToMaterialUpdate: params => {
        if(!params) return;
        return subscribeToMore({
            document: UPDATE_SUBSCRIPTION,
            variables: { id: params },
            updateQuery: (prev) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToMaterialDelete: params => {
        if(!params) return;
        return subscribeToMore({
            document: DELETE_SUBSCRIPTION,
            variables: { id: params },
            updateQuery: (prev) => {
              refetch();
              return prev;
            }
        });
      },
      subscribeToSupplierUpdate: params => {
        if(!params) return;
        return subscribeToMore({
            document: UPDATE_SUPPLIER_SUBSCRIPTION,
            variables: { id: params },
            updateQuery: (prev) => {
              refetch();
              return prev;
            }
        });
      }
    };
    return props;
  }
});

export default GetMaterial;
