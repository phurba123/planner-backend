/**
 * Controller  for routes
 */
let checkLib = require('../lib/checkLib');

//Signing up user
let signUpUser = (req,res)=>
{
     //validating email
     let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    apiResponse = response.generate(true, 'email does not met the requirement', 400, null);
                    logger.error('not valid email', 'userController:validateUserInput', 10)
                    reject(apiResponse)
                }
                else if (checkLib.isEmpty(req.body.password)) {
                    apiResponse = response.generate(true, 'password is empty', 400, null)
                    logger.error('password is empty', 'userController:validateUserInput', 10)
                    reject(apiResponse)
                }
                else {
                    logger.info('user validated', 'userController:validateUserInput', 10);
                    resolve(req);
                }
            }
            else {
                logger.error('email field missing during user creation', 'userController:signUpFunction', 10);
                apiResponse = response.generate(true, 'one or more parameter is missing', 400, null);
                reject(apiResponse);
            }
        });
    }//end of validate user input
}
//logging in user
let logInUser = (req,res)=>
{
    res.send('login')
}

//getting all users
let getAllUsers = (req,res)=>
{
    res.send('getting all users')
}

//getting single user by userId
let getUserById = (req,res)=>
{
    res.send('getting single user by id')
}

//deleting single user by userId
let deleteUserById = (req,res)=>
{
    res.send('deleting single user by id')
}

module.exports =
{
    signUpUser,
    logInUser,
    getAllUsers,
    getUserById,
    deleteUserById
}