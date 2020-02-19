let config = require('../appconfig');

let setRouter = (app)=>
{
    // base url for user routers
    let baseUrl =config.apiVersion +'/user';

    //route for signUp
    app.get(`${baseUrl}/signup`,(req,res)=>{});
}

module.exports = setRouter;