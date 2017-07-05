const handlers = require('../handlers/suppliers');

const create = {
  method: 'POST',
  path: '/suppliers',
  handler: handlers.create
}

const list = {
  method: 'GET',
  path: '/suppliers',
  handler: handlers.create
}

const get = {
  method: 'GET',
  path: '/suppliers/{supplier_id}',
  handler: handlers.create
}

const update = {
  method: 'PATCH',
  path: '/suppliers/{supplier_id}',
  handler: handlers.create
}

const remove = {
  method: 'DELETE',
  path: '/suppliers/{supplier_id}',
  handler: handlers.create
}

module.exports = [
  create,
  list,
  get,
  update,
  remove
];
