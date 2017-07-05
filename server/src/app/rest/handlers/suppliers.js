const controllers = require('../../controllers/suppliers');

const create = function(req, res){
  const data = req.payload;
  const { name } = data;

  controllers.create(name)
  .then((supplier) => res({ supplier }))
  .catch((error) => res({ error }));
}

const list = function(req, res){
  controllers.list()
  .then((suppliers) => res({ suppliers }))
  .catch((error) => res({ error }));
}

const get = function(req, res){
  const supplier_id = req.params.supplier_id;

  controllers.get(supplier_id)
  .then((supplier) => res({ supplier }))
  .catch((error) => res({ error }));
}

const update = function(req, res){
  const supplier_id = req.params.supplier_id;
  const data = req.payload;
  const { name } = data;

  controllers.get(supplier_id)
  .then((supplier) => controllers.update(supplier, { name }))
  .then((supplier) => res({ supplier }))
  .catch((error) => res({ error }));
}

const remove = function(req, res){
  const supplier_id = req.params.supplier_id;

  controllers.remove(supplier_id)
  .then(() => res({ supplier_id }))
  .catch((error) => res({ error }));
}

module.exports = {
  create,
  list,
  get,
  update,
  remove
}
