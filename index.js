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