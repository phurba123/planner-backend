//adding meeting
let addMeeting = () => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.topic && req.body.hostId && req.body.hostName &&
                req.body.participantId && req.body.participantName && req.body.meetingStartDate &&
                req.body.meetingEndDate && req.body.meetingDescription && req.body.meetingPlace) {
                resolve(req)
            } else {
                logger.error('Field Missing During Meeting Creation', 'meetingController: addMeeting()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
}//end of adding meeting

//updating meeting
let updateMeeting = () => {
    //
}//end of updating meeting

//deleting meeting by id
let deleteMeeting = () => {
    //
}//end of deleting meeting

module.exports = {
    addMeeting,
    updateMeeting,
    deleteMeeting
}