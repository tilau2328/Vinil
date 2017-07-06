const { GraphQLSchema } = require('graphql');

const query = require('./queries');
const mutation = require('./mutations');
const subscription = require('./subscriptions');

module.exports = new GraphQLSchema({
  subscription,
  mutation,
  query
});
