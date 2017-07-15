const Project = require('../models/project');

const create = function(name, cost, client, description, materials){
  return new Promise((resolve, reject) => {
    const new_project = new Project({ name, cost, client, description });
    new_project.save()
    .then((project) => resolve(project))
    .catch((error) => reject(error));
  });
}

const list = function({ client }){
  var filter = client ? { client } : null;
  return new Promise((resolve, reject) => {
    Project.find(filter).exec()
    .then((projects) => resolve(projects))
    .catch((error) => reject(error));
  });
}

const get = function(id){
  return new Promise((resolve, reject) => {
    if(!id) resolve(null);
    Project.findById(id).exec()
    .then((project) => resolve(project))
    .catch((error) => reject(error));
  });
}

const param_list = [ 'name', 'cost', 'client', 'description' ];
const update = function(project, params){
  return new Promise((resolve, reject) => {
    for (param in params) {
      if(params[param] && -1 != param_list.indexOf(param)) project[param] = params[param];
      else if(!project) reject('Error: Invalied param' + param + '.');
    }

    return project.save()
    .then((project) => resolve(project))
    .catch((error) => reject(error));
  });
}

const remove = function(id){
  return new Promise((resolve, reject) => {
    Project.findByIdAndRemove(id, (err, project) => {
      if(err) reject(err);
      if(!project) reject('Error: Project does not exist.');
      resolve(id);
    });
  });
}

const listById = function(id_list){
  return new Promise((resolve, reject) => {
    if(!id_list || !id_list.length) resolve([]);
    var project_list = [];
    id_list.map((id) => {
      get(id)
      .then((project) => {
        project_list.push(project);
        if(project_list.length == id_list.length) resolve(project_list);
      })
      .catch((error) => reject(error));
    });
  });
}

const addMaterial = function(project, material, quantity){
  return new Promise((resolve, reject) => {
    project.materials.push({ material, quantity });
    project.save()
    .then((project) => resolve(project))
    .catch((error) => reject(error));
  });
}

const updateMaterial = function(project, material_id, quantity){
  return new Promise((resolve, reject) => {
    const material = project.materials.findIndex(({material}) => material === material_id);
    material.quantity = quantity;
    project.save()
    .then((project) => resolve(project))
    .catch((error) => reject(error));
  });
}

const removeMaterial = function(project, material_id){
  return new Promise((resolve, reject) => {
    const index = project.materials.findIndex(({material}) => material === material_id);
    project.materials.splice(index, 1);
    project.save()
    .then((project) => resolve(project))
    .catch((error) => reject(error));
  });
}


module.exports = {
  create,
  list,
  get,
  update,
  remove,
  listById,
  addMaterial,
  updateMaterial,
  removeMaterial
}
