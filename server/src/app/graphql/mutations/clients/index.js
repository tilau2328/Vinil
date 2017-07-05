const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { ClientType } = require('../../types');

const CreateClient = {
  name: 'CreateClient',
  type: ClientType,
  args: {
    name: { type: GraphQLString }
  },
  resolve: resolvers.create
};

const DeleteClient = {
  name: 'DeleteClient',
  type: GraphQLID,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.remove
};

const UpdateClient = {
  name: 'UpdateClient',
  type: ClientType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString }
  },
  resolve: resolvers.update
};

module.exports = {
  CreateClient,
  DeleteClient,
  UpdateClient
}
