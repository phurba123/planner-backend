const express = require('express');
const app = express();
const config = require('./appconfig')
const fs = require('fs')

// bootstrap routes
let routesPath = './routes';
fs.readdirSync(routesPath).forEach((file)=>
{
    if(~file.indexOf('.js'))
    {
        let route = require(`${routesPath}/${file}`);
        console.log('route is : ',route);
        route.setRouter(app);
    }
});
// end of route bootstrap

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
// start listening to http server
server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);