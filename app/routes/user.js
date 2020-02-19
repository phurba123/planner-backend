let config = require('../../appconfig');

module.exports.setRouter = (app)=>
{
    // base url for user routers
    let baseUrl =config.apiVersion +'/user';
    console.log('baseUrl is : ',baseUrl)

    //route for signUp
    app.get(`${baseUrl}/signup`,(req,res)=>{res.send('signup')});
    
}
