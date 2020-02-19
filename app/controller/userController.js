/**
 * Controller  for routes
 */

//Signing up user
let signUpUser = (req,res)=>
{
    res.send('signup');
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