const projectControllers = require('../../../controllers/projects');
const clientControllers = require('../../../controllers/clients');
const pubsub = require('../../pubsub');

const create = function(source, { name, cost, client, description, materials }){
  return new Promise((resolve, reject) => {
    projectControllers.create(name, cost, client, description, materials)
    .then((project) => {
      if(client) {
        clientControllers.addProject(client, project.id)
        .then((client) => pubsub.publish('ClientUpdate', client.id))
        .catch((error) => console.log(error));
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
          clientControllers.addProject(client, id)
          .then((client) => pubsub.publish('ClientUpdate', client))
          .catch((error) => console.log(error));
        }
        if(project.client) {
          clientControllers.removeProject(project.client, id)
          .then((client) => pubsub.publish('ClientUpdate', project.client))
          .catch((error) => console.log(error));
        }
      }
      return projectControllers.update(project, { name, cost, client, description, materials });
    })
    .then((project) => {
      pubsub.publish('ProjectUpdate', { id: project.id, client: project.client ? project.client.toString() : '' });
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
        clientControllers.removeProject(project.client, id)
        .then((client) => pubsub.publish('ClientUpdate', client.id))
        .catch((error) => console.log(error));
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
