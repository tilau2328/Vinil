const supplierControllers = require('../../../controllers/suppliers');
const materialControllers = require('../../../controllers/materials');
const pubsub = require('../../pubsub');

const create = function(source, { name }){
  return new Promise((resolve, reject) => {
    supplierControllers.create(name)
    .then((supplier) => {
      pubsub.publish("NewSupplier", supplier.id);
      resolve(supplier);
    })
    .catch((error) => reject(error));
  });
}

const update = function(source, { id, name }){
  return new Promise((resolve, reject) => {
    supplierControllers.get(id)
    .then((supplier) => {
      if(!supplier) throw 'Error: Supplier not found.';
      return supplierControllers.update(supplier, { name });
    })
    .then((supplier) => {
      pubsub.publish("SupplierUpdate", supplier.id);
      resolve(supplier);
    })
    .catch((error) => reject(error));
  });
}

const remove = function(source, { id }){
  return new Promise((resolve, reject) => {
    supplierControllers.remove(id)
    .then((supplier_id) => {
      materialControllers.list({ supplier: supplier_id })
      .then((materials) => {
        if(!materials || !materials.length) return;
        materials.map((material) => {
          materialControllers.remove(material.id)
          .then((material_id) => pubsub.publish('MaterialDelete', material_id))
          .catch((error) => console.log(error))
        });
      })
      pubsub.publish("SupplierDelete", supplier_id);
      resolve(supplier_id);
    })
    .catch((error) => reject(error));
  });
}

module.exports = {
  create,
  update,
  remove
}
