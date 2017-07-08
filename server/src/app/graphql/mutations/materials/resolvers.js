const materialsControllers = require('../../../controllers/materials');
const supplierControllers = require('../../../controllers/suppliers');
const pubsub = require('../../pubsub');

const create = function(source, { name, price, supplier, description, available, metric }){
  return new Promise((resolve, reject) => {
    materialsControllers.create(name, price, supplier, description, available, metric)
    .then((material) => {
      if(supplier) {
        supplierControllers.addMaterial(supplier, material.id)
        .then((supplier) => pubsub.publish('SupplierUpdate', supplier))
        .catch((error) => console.log(error));
      }
      pubsub.publish('NewMaterial', material.id);
      resolve(material);
    })
    .catch((error) => reject(error));
  });
}

const update = function(source, { id, name, price, supplier, description, available, metric }){
  return new Promise((resolve, reject) => {
    materialsControllers.get(id)
    .then((material) => {
      if(!material) throw 'Error: Material not found.';
      if(supplier != material.supplier.toString()){
        if(supplier) {
          supplierControllers.addMaterial(supplier, id)
          .then((supplier) => pubsub.publish('SupplierUpdate', supplier.id))
          .catch((error) => console.log(error));
        }
        if(material.supplier) {
          supplierControllers.removeMaterial(material.supplier, id)
          .then((supplier) => pubsub.publish('SupplierUpdate', supplier.id))
          .catch((error) => console.log(error));
        }
      }
      return materialsControllers.update(material, { name, price, supplier, description, available, metric })
    })
    .then((material) => {
      pubsub.publish('MaterialUpdate', { id: material.id, supplier: material.supplier.toString() });
      resolve(material);
    })
    .catch((error) => reject(error));
  });
}

const remove = function(source, { id }){
  return new Promise((resolve, reject) => {
    materialsControllers.get(id)
    .then((material) => {
      if(!material) throw 'Error: Material not found.';
      if(material.supplier) {
        supplierControllers.removeMaterial(material.supplier, id)
        .then((supplier) => pubsub.publish('SupplierUpdate', supplier.id))
        .catch((error) => console.log(error));
      }
      return materialsControllers.remove(id);
    })
    .then((material_id) => {
      pubsub.publish('MaterialDelete', material_id);
      resolve(material_id);
    })
    .catch((error) => reject(error));
  });
}

module.exports = {
  create,
  update,
  remove
}
