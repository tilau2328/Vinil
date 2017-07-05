const clients = require('./clients');
const materials = require('./materials');
const projects = require('./projects');
const suppliers = require('./suppliers');

var routes = [];
routes.push.apply(routes, clients);
routes.push.apply(routes, materials);
routes.push.apply(routes, projects);
routes.push.apply(routes, suppliers);

module.exports = routes;
