const express = require('express');
const app = express();
const config = require('./appconfig')
const fs = require('fs')
const http = require('http')
const bodyParser = require('body-parser')
let mongoose = require('mongoose')
let logger = require('./app/lib/loggerLib')
const morgan = require('morgan')
const routeLogger = require('./app/middleware/routeLogger');
const appErrorHandler = require('./app/middleware/appErrorHandler');

//application level middlewares

app.use(morgan('dev'));
app.use(routeLogger.logIp);
app.use(appErrorHandler.globalErrorHandler);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", config.allowedCorsOrigin);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   next();
// });

let modelsPath = ('./app/model');
//Bootstrap models
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('.js')) require(modelsPath + '/' + file)
});
// end Bootstrap models


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

//global 404 handler after route bootstrap
app.use(appErrorHandler.globalNotFoundHandler)

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

  logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
  let db = mongoose.connect(config.db.uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
}

/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
  console.log('database connection error');
  console.log(err)
  logger.error(err,
    'mongoose connection on error handler', 10)
}); // end mongoose connection error

mongoose.connection.on('open', function (err) {
  if (err) {
    console.log("database error");
    console.log(err);
    logger.error(err, 'mongoose connection open handler', 10)
  } else {
    console.log("database connection open success");
    logger.info("database connection open",
      'database connection open handler', 10)
  }
}); // enr mongoose connection open handler

module.exports = app;