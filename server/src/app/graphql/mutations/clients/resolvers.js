const controllers = require('../../../controllers/clients');
const pubsub = require('../../pubsub');

const create = function(source, { name }){
  return new Promise((resolve, reject) => {
    controllers.create(name)
    .then((client) => {
      pubsub.publish('NewClient', { NewClient: { id: client.id }});
      resolve(client);
    })
    .catch((error) => reject(error));
  });
}

const update = function(source, { id, name }){
  return new Promise((resolve, reject) => {
    controllers.get(id)
    .then((client) => {
      if(!client) throw 'Error: Client not found.';
      return controllers.update(client, { name });
    })
    .then((client) => {
      pubsub.publish('ClientUpdate', { ClientUpdate: { id: client.id }});
      resolve(client);
    })
    .catch((error) => reject(error));
  });
}

const remove = function(source, { id }){
  return new Promise((resolve, reject) => {
    controllers.remove(id)
    .then((client_id) => resolve(client_id))
    .catch((error) => reject(error));
  });
}

module.exports = {
  create,
  update,
  remove
}
