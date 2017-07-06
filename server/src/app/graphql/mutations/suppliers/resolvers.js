const controllers = require('../../../controllers/suppliers');
const pubsub = require('../../pubsub');

const create = function(source, { name }){
  return new Promise((resolve, reject) => {
    controllers.create(name)
    .then((supplier) => {
      pubsub.publish("NewSupplier", supplier.id);
      resolve(supplier);
    })
    .catch((error) => reject(error));
  });
}

const update = function(source, { id, name }){
  return new Promise((resolve, reject) => {
    controllers.get(id)
    .then((supplier) => {
      if(!supplier) throw 'Error: Supplier not found.';
      return controllers.update(supplier, { name });
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
    controllers.remove(id)
    .then((supplier_id) => {
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
