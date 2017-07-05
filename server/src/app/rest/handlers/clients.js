const controllers = require('../../controllers/clients');

const create = function(req, res){
  const data = req.payload;
  const { name } = data;

  controllers.create(name)
  .then((client) => res({ client }))
  .catch((error) => res({ error }));
}

const list = function(req, res){
  controllers.list()
  .then((clients) => res({ clients }))
  .catch((error) => res({ error }));
}

const get = function(req, res){
  const client_id = req.params.client_id;

  controllers.get(client_id)
  .then((client) => res({ client }))
  .catch((error) => res({ error }));
}

const update = function(req, res){
  const client_id = req.params.client_id;
  const data = req.payload;
  const { name } = data;

  controllers.get(client_id)
  .then((client) => controllers.update(client, { name }))
  .then((client) => res({ client }))
  .catch((error) => res({ error }));
}

const remove = function(req, res){
  const client_id = req.params.client_id;

  controllers.remove(client_id)
  .then(() => res({ client_id }))
  .catch((error) => res({ error }));
}

module.exports = {
  create,
  list,
  get,
  update,
  remove
}
