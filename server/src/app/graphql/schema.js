const { GraphQLSchema } = require('graphql');

const query = require('./queries');
const mutation = require('./mutations');
const subscriptions = require('./subscriptions');

module.exports = new GraphQLSchema({
  //subscriptions,
  mutation,
  query
});
