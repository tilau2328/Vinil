import { graphql } from 'react-apollo';
import SUBSCRIPTION from './subscription.graphql';

const ClientUpdate = graphql(SUBSCRIPTION);

export default ClientUpdate;
