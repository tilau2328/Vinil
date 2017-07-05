const controllers = require('../../controllers/materials');

const create = function(req, res){
  const data = req.payload;
  const { name, price, supplier, description, available, metrics } = data;

  controllers.create(name, price, supplier, description, available, metrics)
  .then((material) => res({ material }))
  .catch((error) => res({ error }));
}

const list = function(req, res){
  controllers.list()
  .then((materials) => res({ materials }))
  .catch((error) => res({ error }));
}

const get = function(req, res){
  const material_id = req.params.material_id;
  controllers.get(material_id)
  .then((material) => res({ material }))
  .catch((error) => res({ error }));
}

const update = function(req, res){
  const material_id = req.params.material_id;
  const data = req.payload;
  const { name, price, supplier, description, available, metric } = data;

  controllers.get(material_id)
  .then((material) => controllers.update(material, { name, price, supplier, description, available, metric }))
  .then((material) => res({ material }))
  .catch((error) => res({ error }));
}

const remove = function(req, res){
  const material_id = req.params.material_id;
  controllers.remove(material_id)
  .then(() => res({ material_id }))
  .catch((error) => res({ error }));
}

module.exports = {
  create,
  list,
  get,
  update,
  remove
}
