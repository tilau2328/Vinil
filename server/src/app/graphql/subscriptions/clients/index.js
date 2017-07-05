const {
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { ClientType } = require('../../types');

const ClientUpdate = {
  name: 'ClientUpdate',
  type: ClientType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.get,
  subscribe: () => pubsub.asyncIterator('ClientUpdated')
};

const NewClient = {
  name: 'NewClient',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('ClientAdded')
};

module.exports = {
  ClientUpdate,
  NewClient
}
