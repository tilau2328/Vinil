const controllers = require('../../../controllers/clients');

const list = function(){
  return new Promise((resolve, reject) => {
    controllers.list()
    .then((clients) => resolve(clients))
    .catch((error) => reject(error));
  });
}

const get = function(source, { id }){
  return new Promise((resolve, reject) => {
    controllers.get(id)
    .then((client) => resolve(client))
    .catch((error) => reject(error));
  });
}

module.exports = {
  list,
  get
}
