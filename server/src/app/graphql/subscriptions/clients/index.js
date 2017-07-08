const {
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const { withFilter } = require('graphql-subscriptions');
const pubsub = require('../../pubsub');

const ClientUpdate = {
  name: 'ClientUpdate',
  type: GraphQLID,
  args: {
    id:  { type: GraphQLID }
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('ClientUpdate'),
    (payload, variables) => {
      return !variables.id
       || payload === variables.id;
    }
  )
};

const NewClient = {
  name: 'NewClient',
  type: GraphQLID,
  subscribe: () => pubsub.asyncIterator('NewClient')
};

const ClientDelete = {
  name: 'ClientDelete',
  type: GraphQLID,
  args: {
    id:  { type: GraphQLID }
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('ClientDelete'),
    (payload, variables) => {
      return payload === variables.id || !variables.id;
    }
  )
};

module.exports = {
  ClientUpdate,
  ClientDelete,
  NewClient
}
