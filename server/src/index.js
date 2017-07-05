const { getServer } = require('./server');

getServer().then((server) => {
  server.start((err) => {
    if (err) { throw err; }
    console.log(`Server running at: ${server.info.uri}`);
  });
}).catch((err) => { throw err; });
