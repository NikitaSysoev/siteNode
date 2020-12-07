const http = require('http');
const url = require('url');

const server = new http.Server((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/echo' && query.message) {
    res.end(query.message);
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

server.listen(1337, '127.0.0.1');

// const emit = server.emit;
// server.emit = function (event) {
//   console.log(event);
//   emit.apply(server, arguments);
// };

let counter = 0;
server.on('request', (req, res) => {
  res.end('hello world' + ' ' + ++counter);
});
