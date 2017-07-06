const {
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const { withFilter } = require('graphql-subscriptions');
const pubsub = require('../../pubsub');

const ProjectUpdate = {
  name: 'ProjectUpdate',
  type: GraphQLID,
  args: {
    id:  { type: new GraphQLNonNull(GraphQLID) }
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('ProjectUpdate'),
    (payload, variables) => {
      return payload === variables.id;
    }
  )
};

const NewProject = {
  name: 'NewProject',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('NewProject')
};

const ProjectDelete = {
  name: 'ProjectDelete',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('ProjectDelete')
};

module.exports = {
  ProjectUpdate,
  ProjectDelete,
  NewProject
}
