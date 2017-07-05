const controllers = require('../../../controllers/projects');

const list = function(){
  return new Promise((resolve, reject) => {
    controllers.list({})
    .then((projects) => resolve(projects))
    .catch((error) => reject(error));
  });
}

const get = function(source, { id }){
  return new Promise((resolve, reject) => {
    controllers.get(id)
    .then((project) => resolve(project))
    .catch((error) => reject(error));
  });
}

module.exports = {
  list,
  get
}
