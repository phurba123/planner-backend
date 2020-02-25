let appConfig = require('../../appconfig')
let controller = require('../controller/meetingController');

let setRouter = (app)=>
{
    let baseUrl = `${appConfig.apiVersion}/meeting`;

    app.post(`${baseUrl}/addMeeting`,controller.addMeeting);

    app.put(`${baseUrl}/:meetingId/updateMeeting`,controller.updateMeeting);

    app.post(`${baseUrl}/:meetingId/deleteMeeting`,controller.deleteMeeting)
}

module.exports ={
    setRouter
}