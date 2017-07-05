const GraphQL  = require('hapi-graphql');
const schema = require('../graphql/schema');

module.exports = {
  register: GraphQL,
  options: {
    query: {
      graphiql: true,
      schema
    },
    route: {
      path: '/graphql',
      config: {
        auth: false
      }
    }
  }
};
