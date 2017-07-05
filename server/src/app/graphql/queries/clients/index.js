const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { ClientType } = require('../../types');

const ListClients = {
  name: 'ListClients',
  type: new GraphQLList(ClientType),
  resolve: resolvers.list
};

const GetClient = {
  name: 'GetClient',
  type: ClientType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.get
};

module.exports = {
  ListClients,
  GetClient
}
