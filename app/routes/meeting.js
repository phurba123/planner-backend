let appConfig = require('../../appconfig')
let controller = require('../controller/meetingController');
let authMiddleware = require('../middleware/auth')
let setRouter = (app)=>
{
    let baseUrl = `${appConfig.apiVersion}/meeting`;

    app.post(`${baseUrl}/addMeeting`,authMiddleware.isAuthorized, controller.addMeeting);

    app.put(`${baseUrl}/:meetingId/updateMeeting`,authMiddleware.isAuthorized, controller.updateMeeting);

    app.post(`${baseUrl}/:meetingId/deleteMeeting`,authMiddleware.isAuthorized, controller.deleteMeeting);

    //get all meetings of particular user by userId
    app.get(`${baseUrl}/:userId/view/all`,authMiddleware.isAuthorized, controller.getAllMeetingsOfUser)

    app.get(`${baseUrl}/:meetingId/view`,authMiddleware.isAuthorized, controller.getMeetingByMeetingId)
    
}

module.exports ={
    setRouter
}