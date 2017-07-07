const projectControllers = require('../../../controllers/projects');
const clientControllers = require('../../../controllers/clients');
const pubsub = require('../../pubsub');

const create = function(source, { name, cost, client, description, materials }){
  return new Promise((resolve, reject) => {
    projectControllers.create(name, cost, client, description, materials)
    .then((project) => {
      if(client) {
        clientControllers.addProject(client, project.id);
        pubsub.publish('ClientUpdate', client);
      }
      pubsub.publish('NewProject', project.id);
      resolve(project);
    })
    .catch((error) => reject(error));
  });
}

const update = function(source, { id, name, cost, client, description, materials }){
  return new Promise((resolve, reject) => {
    var old_client;
    projectControllers.get(id)
    .then((project) => {
      if(!project) throw 'Error: Project not found.';
      if(client != project.client.toString()){
        if(client) {
          clientControllers.addProject(client, id);
          pubsub.publish('ClientUpdate', client);
        }
        if(project.client) {
          clientControllers.removeProject(project.client, id);
          pubsub.publish('ClientUpdate', project.client);
        }
      }
      return projectControllers.update(project, { name, cost, client, description, materials });
    })
    .then((project) => {
      pubsub.publish('ProjectUpdate', project.id);
      resolve(project);
    })
    .catch((error) => reject(error));
  });
}

const remove = function(source, { id }){
  return new Promise((resolve, reject) => {
    projectControllers.get(id)
    .then((project) => {
      if(!project) throw 'Error: Project not found.';
      if(project.client) {
        clientControllers.removeProject(project.client, id);
        pubsub.publish('ClientUpdate', project.client);
      }
      return projectControllers.remove(id)
    })
    .then((project_id) => {
      pubsub.publish('ProjectDelete', project_id);
      resolve(project_id);
    })
    .catch((error) => reject(error));
  });
}

module.exports = {
  create,
  update,
  remove
}
