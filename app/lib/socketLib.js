
const socketio =require('socket.io')
const tokenLib = require("./tokenLib.js");
const redisLib = require("./redisLib.js");
const logger = require('./loggerLib')


let setServer = (server) => {

    let io = socketio.listen(server);
    let myIo = io.of('')//this is sort of socket routing(namespace)
    
    myIo.on('connection', (socket) => {

        console.log("on connection emitting verify user");

        socket.emit("verifyUser", "");

        // code to verify the user and make him online

        socket.on('set-user', (token) => {

            console.log("set-user called")
            console.log(token)
            tokenLib.verifyClaimWithoutSecret(token, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {
                    console.log('user inside setuser',user)

                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let userName = currentUser.userName;

                    let key = currentUser.userId
                    let value = userName

                    redisLib.setANewOnlineUserInHash("onlineUsersList", key, value, (err, result) => {
                        if (err) {
                            console.log(`some error occurred`)
                        } else {
                            // getting online users list.

                            redisLib.getAllUsersInAHash('onlineUsersList', (err, result) => {
                                if (err) {
                                    logger.error('error while getting alluserList in hash','socketLib:getAllUsersInAHash',10);
                                } else {

                                    console.log(`${userName} is online`);

                                    //emitting online-user-list on being new user listed as online
                                    socket.broadcast.emit('online-user-list', result);
                                }
                            })
                        }
                    })

                }
            })

        })

        socket.on('new-meeting',(participantId)=>
        {
            //emit users about new meeting created
            socket.broadcast.emit(participantId,('New meeting is created'));
        });

        
        socket.on('update-info',(participantId)=>
        {
            //emit users about update
            socket.broadcast.emit(participantId,('Your Meeting has been updated'))
        })

        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            console.log(socket.userId)

            if (socket.userId) {
                redisLib.deleteUserFromHash('onlineUsersList', socket.userId)
                redisLib.getAllUsersInAHash('onlineUsersList', (err, result) => {
                    if (err) {
                        logger.error(err,'socketLib:onDisconnect',5);
                    } else {
                        socket.broadcast.emit('online-user-list', result);
                    }
                })
            }

        }) // end of on disconnect

    });
}

module.exports = {
    setServer: setServer
}
