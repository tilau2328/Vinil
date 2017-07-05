const handlers = require('../handlers/clients');

const create = {
  method: 'POST',
  path: '/clients',
  handler: handlers.create
}

const list = {
  method: 'GET',
  path: '/clients',
  handler: handlers.create
}

const get = {
  method: 'GET',
  path: '/clients/{client_id}',
  handler: handlers.create
}

const update = {
  method: 'PATCH',
  path: '/clients/{client_id}',
  handler: handlers.create
}

const remove = {
  method: 'DELETE',
  path: '/clients/{client_id}',
  handler: handlers.create
}

module.exports = [
  create,
  list,
  get,
  update,
  remove
];
