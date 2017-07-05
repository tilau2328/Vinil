const Supplier = require('../models/supplier');

const create = function(name){
  return new Promise((resolve, reject) => {
    const new_supplier = new Supplier({ name });
    new_supplier.save()
    .then((supplier) => resolve(supplier))
    .catch((error) => reject(error));
  });
}

const list = function(){
  return new Promise((resolve, reject) => {
    Supplier.find().exec()
    .then((suppliers) => resolve(suppliers))
    .catch((error) => reject(error));
  });
}

const get = function(id){
  return new Promise((resolve, reject) => {
    if(!id) resolve(null);
    Supplier.findById(id).exec()
    .then((supplier) => resolve(supplier))
    .catch((error) => reject(error));
  });
}

const param_list = [ 'name' ];
const update = function(supplier, params){
  return new Promise((resolve, reject) => {
    for (param in params) {
      if(params[param] && -1 != param_list.indexOf(param)) supplier[param] = params[param];
      else if(!supplier) reject('Error: Invalied param' + param + '.');
    }
    return supplier.save()
    .then((supplier) => resolve(supplier))
    .catch((error) => reject(error));
  });
}

const remove = function(id){
  return new Promise((resolve, reject) => {
    Supplier.findByIdAndRemove(id, (err, supplier) => {
      if(err) reject(err);
      if(!supplier) reject('Error: Supplier does not exist.');
      resolve(id);
    });
  });
}

const addMaterial = function(supplier_id, material_id){
  return new Promise((resolve, reject) => {
    get(supplier_id)
    .then((supplier) => {
      if(!supplier) throw 'Error: Supplier not found.';
      supplier.materials.push(material_id);
      return supplier.save();
    })
    .then((supplier) => resolve(supplier))
    .catch((error) => reject(error));
  });
}

const removeMaterial = function(supplier_id, material_id){
  return new Promise((resolve, reject) => {
    get(supplier_id)
    .then((supplier) => {
      if(!supplier) throw 'Error: Supplier not found.';
      const index = supplier.materials.findIndex((material) => material_id == material.toString());
      supplier.materials.splice(index, 1);
      return supplier.save();
    })
    .then((supplier) => resolve(supplier))
    .catch((error) => reject(error));
  });
}
module.exports = {
  create,
  list,
  get,
  update,
  remove
}
