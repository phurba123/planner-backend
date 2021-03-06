let config = require('../../appconfig');
let userController = require('../controller/userController');
let authMiddleware = require('../middleware/auth')

module.exports.setRouter = (app)=>
{
    // base url for user routers
    let baseUrl =config.apiVersion +'/user';
    console.log('baseUrl is : ',baseUrl)

    //route for signUp
    app.post(`${baseUrl}/signup`,userController.signUpUser);

    //route for login
    app.post(`${baseUrl}/login`,userController.logInUser);

    //route for logout
    app.post(`${baseUrl}/logout`,authMiddleware.isAuthorized, userController.logout);

    //route for getting all the users
    app.get(`${baseUrl}/view/all`,authMiddleware.isAuthorized, userController.getAllUsers)

    //route for getting single user by userId
    app.get(`${baseUrl}/:userId/view`,authMiddleware.isAuthorized, userController.getUserById);

    //route for deleting particular user by user id
    app.post(`${baseUrl}/:userId/delete`,authMiddleware.isAuthorized, userController.deleteUserById);

    //route for editing particular user by id
    app.put(`${baseUrl}/:userId/edit`,authMiddleware.isAuthorized, userController.editUser)

    //route for recovering forgot password
    app.get(`${baseUrl}/:email/recoverPassword`,userController.recoverForgotPassword);
}
