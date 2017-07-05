const Material = require('../models/material');

const create = function(name, price, supplier, description, available, metric){
  return new Promise((resolve, reject) => {
    const new_material = new Material({ name, price, supplier, description, available, metric });
    new_material.save()
    .then((material) => resolve(material))
    .catch((error) => reject(error));
  });
}

const list = function({ supplier }){
  return new Promise((resolve, reject) => {
    Material.find({ supplier }).exec()
    .then((materials) => resolve(materials))
    .catch((error) => reject(error));
  });
}

const get = function(id){
  return new Promise((resolve, reject) => {
    if(!id) resolve(null);
    Material.findById(id).exec()
    .then((material) => resolve(material))
    .catch((error) => reject(error));
  });
}

const param_list = [ 'name', 'price', 'supplier', 'description', 'available', 'metric' ];
const update = function(material, params){
  return new Promise((resolve, reject) => {
    for (param in params) {
      if(params[param] && -1 != param_list.indexOf(param)) material[param] = params[param];
      else if(!material) reject('Error: Invalied param' + param + '.');
    }
    return material.save()
    .then((material) => resolve(material))
    .catch((error) => reject(error));
  });
}

const remove = function(id){
  return new Promise((resolve, reject) => {
    Material.findByIdAndRemove(id, (err, material) => {
      if(err) reject(err);
      if(!material) reject('Error: Material does not exist.');
      resolve(id);
    });
  });
}

const listById = function(id_list){
  return new Promise((resolve, reject) => {
    if(!id_list || !id_list.length) resolve([]);
    var material_list = [];
    id_list.map((id) => {
      get(id.material || id)
      .then((material) => {
        material_list.push(material);
        if(material_list.length == id_list.length) resolve(material_list);
      })
      .catch((error) => reject(error));
    });
  });
}

module.exports = {
  create,
  list,
  get,
  update,
  remove,
  listById
}
