const {
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const { withFilter } = require('graphql-subscriptions');
const pubsub = require('../../pubsub');

const SupplierUpdate = {
  name: 'SupplierUpdate',
  type: GraphQLID,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('SupplierUpdate'),
    (payload, variables) => {
      return payload === variables.id;
    }
  )
};

const NewSupplier = {
  name: 'NewSupplier',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('NewSupplier')
};

const SupplierDelete = {
  name: 'SupplierDelete',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('SupplierDelete')
};

module.exports = {
  SupplierUpdate,
  SupplierDelete,
  NewSupplier
}
