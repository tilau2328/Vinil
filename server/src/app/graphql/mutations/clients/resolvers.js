const clientControllers = require('../../../controllers/clients');
const projectControllers = require('../../../controllers/projects');
const pubsub = require('../../pubsub');

const create = function(source, { name }){
  return new Promise((resolve, reject) => {
    clientControllers.create(name)
    .then((client) => {
      pubsub.publish('NewClient', client.id);
      resolve(client);
    })
    .catch((error) => reject(error));
  });
}

const update = function(source, { id, name }){
  return new Promise((resolve, reject) => {
    clientControllers.get(id)
    .then((client) => {
      if(!client) throw 'Error: Client not found.';
      return clientControllers.update(client, { name });
    })
    .then((client) => {
      pubsub.publish('ClientUpdate', client.id);
      resolve(client);
    })
    .catch((error) => reject(error));
  });
}

const remove = function(source, { id }){
  return new Promise((resolve, reject) => {

    clientControllers.remove(id)
    .then((client_id) => {
      projectControllers.list({ client: client_id })
      .then((projects) => {
        if(!projects || !projects.length) return;
        projects.map((project) => {
          projectControllers.update(project, { client: null })
          .then((project) => pubsub.publish('ProjectUpdate', project.id))
          .catch((error) => console.log(error))
        });
      })
      .catch((error) => console.log(error))
      pubsub.publish('ClientDelete', client_id);
      resolve(client_id);
    })
    .catch((error) => reject(error));
  });
}

module.exports = {
  create,
  update,
  remove
}
