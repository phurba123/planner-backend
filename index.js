const express = require('express');
const app = express();
const config = require('./appconfig')
const fs = require('fs')
const http = require('http')

let routesPath = './app/routes';
//console.log('routesPath is : ' +routesPath);

// Bootstrap route
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
// start listening to http server
server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);
//end of server listening

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
    throw error;
  }


  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      //logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      //logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
      process.exit(1);
      break;
    default:
      //logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
      throw error;
  }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
    console.log('inside onListening')

    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind);
    console.log('server listening at : ', addr.port)
}

module.exports = app;