const controllers = require('../../../controllers/suppliers');

const list = function(){
  return new Promise((resolve, reject) => {
    controllers.list()
    .then((suppliers) => resolve(suppliers))
    .catch((error) => reject(error));
  });
}

const get = function(source, { id }){
  return new Promise((resolve, reject) => {
    controllers.get(id)
    .then((supplier) => resolve(supplier))
    .catch((error) => reject(error));
  });
}

module.exports = {
  list,
  get
}
