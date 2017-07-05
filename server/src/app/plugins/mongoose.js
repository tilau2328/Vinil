const mongoose = require('mongoose');

const options = {
  mongodbUrl: 'mongodb://localhost/vinil',
  bluebird: true
};

module.exports = {
  register: require('hapi-mongoose-db-connector'),
  options: options
};
