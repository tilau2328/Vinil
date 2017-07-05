const controllers = require('../../../controllers/materials');

const list = function(){
  return new Promise((resolve, reject) => {
    controllers.list({})
    .then((materials) => resolve(materials))
    .catch((error) => reject(error));
  });
}

const get = function(source, { id }){
  return new Promise((resolve, reject) => {
    controllers.get(id)
    .then((material) => resolve(material))
    .catch((error) => reject(error));
  });
}

module.exports = {
  list,
  get
}
