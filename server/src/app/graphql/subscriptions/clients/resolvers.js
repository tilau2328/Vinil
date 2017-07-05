const controllers = require('../../../controllers/clients');

const get = function(source, { id }){
  return new Promise((resolve, reject) => {
    controllers.get(id)
    .then((client) => resolve(client))
    .catch((error) => reject(error));
  });
}

module.exports = {
  get
}
