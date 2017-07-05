const Client = require('../models/client');

const create = function(name){
  return new Promise((resolve, reject) => {
    const new_client = new Client({ name });
    new_client.save()
    .then((client) => resolve(client))
    .catch((error) => reject(error));
  });
}

const list = function(){
  return new Promise((resolve, reject) => {
    Client.find().exec()
    .then((clients) => resolve(clients))
    .catch((error) => reject(error));
  });
}

const get = function(id){
  return new Promise((resolve, reject) => {
    if(!id) resolve(null);
    Client.findById(id).exec()
    .then((client) => resolve(client))
    .catch((error) => reject(error));
  });
}

const param_list = [ 'name' ];
const update = function(client, params){
  return new Promise((resolve, reject) => {
    for (param in params) {
      if(params[param] && -1 != param_list.indexOf(param)) client[param] = params[param];
      else if(!client) reject('Error: Invalied param' + param + '.');
    }
    return client.save()
    .then((client) => resolve(client))
    .catch((error) => reject(error));
  });
}

const remove = function(id){
  return new Promise((resolve, reject) => {
    Client.findByIdAndRemove(id, (err, client) => {
      if(err) reject(err);
      if(!client) reject('Error: Client does not exist.');
      resolve(id);
    });
  });
}

const addProject = function(client_id, project_id){
  return new Promise((resolve, reject) => {
    get(client_id)
    .then((client) => {
      if(!client) throw 'Error: Client not found.';
      client.projects.push(project_id);
      return client.save();
    })
    .then((client) => resolve(client))
    .catch((error) => reject(error));
  });
}

const removeProject = function(client_id, project_id){
  return new Promise((resolve, reject) => {
    get(client_id)
    .then((client) => {
      if(!client) throw 'Error: Client not found.';
      const index = client.projects.findIndex((project) => project_id == project.toString());
      client.projects.splice(index, 1);
      return client.save();
    })
    .then((client) => resolve(client))
    .catch((error) => reject(error));
  });
}

module.exports = {
  create,
  list,
  get,
  update,
  remove,
  addProject,
  removeProject
}
