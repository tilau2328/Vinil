const handlers = require('../handlers/materials');

const create = {
  method: 'POST',
  path: '/materials',
  handler: handlers.create
}

const list = {
  method: 'GET',
  path: '/materials',
  handler: handlers.create
}

const get = {
  method: 'GET',
  path: '/materials/{material_id}',
  handler: handlers.create
}

const update = {
  method: 'PATCH',
  path: '/materials/{material_id}',
  handler: handlers.create
}

const remove = {
  method: 'DELETE',
  path: '/materials/{material_id}',
  handler: handlers.create
}

module.exports = [
  create,
  list,
  get,
  update,
  remove
];
