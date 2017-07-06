const {
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const { withFilter } = require('graphql-subscriptions');
const pubsub = require('../../pubsub');

const MaterialUpdate = {
  name: 'MaterialUpdate',
  type: GraphQLID,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('MaterialUpdate'),
    (payload, variables) => {
      return payload === variables.id;
    }
  )
};

const NewMaterial = {
  name: 'NewMaterial',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('NewMaterial')
};

const MaterialDelete = {
  name: 'MaterialDelete',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('MaterialDelete')
};

module.exports = {
  MaterialUpdate,
  MaterialDelete,
  NewMaterial
}
