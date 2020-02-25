let appConfig = require('../../appconfig')
let controller = require('../controller/meetingController');

let setRouter = (app)=>
{
    let baseUrl = `${appConfig.apiVersion}/meeting`;

    app.post(`${baseUrl}/addMeeting`,controller.addMeeting);

    app.put(`${baseUrl}/:meetingId/updateMeeting`,controller.updateMeeting);

    app.post(`${baseUrl}/:meetingId/deleteMeeting`,controller.deleteMeeting);

    //get all meetings of particular user by userId
    app.get(`${baseUrl}/:userId/view/all`,controller.getAllMeetings)
}

module.exports ={
    setRouter
}