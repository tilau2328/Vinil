import { graphql } from 'react-apollo';
import SUBSCRIPTION from './subscription.graphql';

const NewClient = graphql(SUBSCRIPTION);

export default NewClient;
