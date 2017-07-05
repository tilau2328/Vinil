const projectControllers = require('../../../controllers/projects');
const clientControllers = require('../../../controllers/clients');

const create = function(source, { name, cost, client, description, materials }){
  return new Promise((resolve, reject) => {
    projectControllers.create(name, cost, client, description, materials)
    .then((project) => {
      if(client) clientControllers.addProject(client, project.id);
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
        if(client) clientControllers.addProject(client, id);
        if(project.client) clientControllers.removeProject(project.client, id);
      }
      return projectControllers.update(project, { name, cost, client, description, materials });
    })
    .then((project) => resolve(project))
    .catch((error) => reject(error));
  });
}

const remove = function(source, { id }){
  return new Promise((resolve, reject) => {
    projectControllers.get(id)
    .then((project) => {
      if(!project) throw 'Error: Project not found.';
      if(project.client) clientControllers.removeProject(project.client, id);
      return projectControllers.remove(id)
    })
    .then(() => resolve(id))
    .catch((error) => reject(error));
  });
}

module.exports = {
  create,
  update,
  remove
}