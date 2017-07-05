const handlers = require('../handlers/projects');

const create = {
  method: 'POST',
  path: '/projects',
  handler: handlers.create
}

const list = {
  method: 'GET',
  path: '/projects',
  handler: handlers.create
}

const get = {
  method: 'GET',
  path: '/projects/{project_id}',
  handler: handlers.create
}

const update = {
  method: 'PATCH',
  path: '/projects/{project_id}',
  handler: handlers.create
}

const remove = {
  method: 'DELETE',
  path: '/projects/{project_id}',
  handler: handlers.create
}

module.exports = [
  create,
  list,
  get,
  update,
  remove
];
