const server = require('./server');

global.log = (...args) => (module) => {
  console.log.apply(this, [module.filename].concat(args));
};

server.run();
