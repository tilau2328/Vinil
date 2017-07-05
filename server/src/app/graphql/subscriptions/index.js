const { GraphQLObjectType } = require('graphql');

var fields = {};

Object.assign(fields, require('./clients'));
Object.assign(fields, require('./materials'));
Object.assign(fields, require('./projects'));
Object.assign(fields, require('./suppliers'));

module.exports = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => fields
});
