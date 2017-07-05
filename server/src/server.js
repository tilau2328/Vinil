const hapi = require('hapi');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const schema = require('./app/graphql/schema');
const app = require('./app');
const server = new hapi.Server();

const getServer = function(){
  server.connection({ host: 'localhost', port: 8000 });
  new SubscriptionServer({ schema, execute, subscribe }, { server: server.listener, path: '/subscriptions' });
  return new Promise((resolve, reject) => {
    server.register(app.plugins, (err) => {
      if (err) reject(err);
      server.route(app.routes);
      resolve(server);
    });
  });
};

module.exports = {
  getServer
}
