const controllers = require('../../controllers/projects');

const create = function(req, res){
  const data = req.payload;
  const { name, cost, client, description, project } = data;

  controllers.create(name, cost, client, description, project)
  .then((project) => res({ project }))
  .catch((error) => res({ error }));
}

const list = function(req, res){
  controllers.list()
  .then((projects) => res({ projects }))
  .catch((error) => res({ error }));
}

const get = function(req, res){
  const project_id = req.params.project_id;
  controllers.get(project_id)
  .then((project) => res({ project }))
  .catch((error) => res({ error }));
}

const update = function(req, res){
  const project_id = req.params.project_id;
  const data = req.payload;
  const { name, cost, client, description, project } = data;

  controllers.get(project_id)
  .then((project) => controllers.update(project,  { name, cost, client, description, project }))
  .then((project) => res({ project }))
  .catch((error) => res({ error }));
}

const remove = function(req, res){
  const project_id = req.params.project_id;
  controllers.remove(project_id)
  .then(() => res({ project_id }))
  .catch((error) => res({ error }));
}

module.exports = {
  create,
  list,
  get,
  update,
  remove
}
