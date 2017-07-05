const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const resolvers = require('./resolvers');
const { ProjectType } = require('../../types');

const ListProjects = {
  name: 'ListProjects',
  type: new GraphQLList(ProjectType),
  resolve: resolvers.list
};

const GetProject = {
  name: 'GetProject',
  type: ProjectType,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: resolvers.get
};

module.exports = {
  ListProjects,
  GetProject
}
