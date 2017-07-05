const mongoose = require('./mongoose');
const grpahql = require('./graphql');
const cors = require('./cors');

module.exports = [
  mongoose,
  grpahql,
  cors
];
