const clientControllers = require('../../controllers/clients');
const projectControllers = require('../../controllers/projects');
const materialControllers = require('../../controllers/materials');
const supplierControllers = require('../../controllers/suppliers');

const clientProjects = function({ projects }){
  return new Promise((resolve, reject) => {
    projectControllers.listById(projects)
    .then((projects) => resolve(projects))
    .catch((error) => reject(error));
  });
}

const projectMaterials = function({ materials }){
  return new Promise((resolve, reject) => {
    materialControllers.listById(materials)
    .then((materials) => resolve(materials))
    .catch((error) => reject(error));
  });
}

const projectClient = function({ client }){
  return new Promise((resolve, reject) => {
    clientControllers.get(client)
    .then((client) => resolve(client))
    .catch((error) => reject(error));
  });
}

const materialSupplier = function({ supplier }){
  return new Promise((resolve, reject) => {
    supplierControllers.get(supplier)
    .then((supplier) => resolve(supplier))
    .catch((error) => reject(error));
  });
}

const supplierMaterials = function({ materials }){
  return new Promise((resolve, reject) => {
    materialControllers.listById(materials)
    .then((materials) => resolve(materials))
    .catch((error) => reject(error));
  });
}

module.exports = {
  projectClient,
  clientProjects,
  projectMaterials,
  materialSupplier,
  supplierMaterials
}
