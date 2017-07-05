const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { ProjectType } = require('../../types');

const CreateProject = {
  name: 'CreateProject',
  type: ProjectType,
  args: {
    name: { type: GraphQLString },
    cost: { type: GraphQLInt },
    client: { type: GraphQLID },
    description: { type: GraphQLString }
  },
  resolve: resolvers.create
};

const DeleteProject = {
  name: 'DeleteProject',
  type: GraphQLID,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.remove
};

const UpdateProject = {
  name: 'UpdateProject',
  type: ProjectType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    cost: { type: GraphQLInt },
    client: { type: GraphQLID },
    description: { type: GraphQLString }
  },
  resolve: resolvers.update
};

module.exports = {
  CreateProject,
  DeleteProject,
  UpdateProject
}
