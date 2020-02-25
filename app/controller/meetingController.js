let logger = require('../lib/loggerLib');
const mongoose = require('mongoose');
let meetingModel = mongoose.model('Meeting');
let shortid = require('shortid');
let time = require('../lib/timeLib');
let response = require('../lib/responseLib');
let check = require('../lib/checkLib')

//adding meeting
let addMeeting = (req, res) => {
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

    //adding meeting promise
    let addMeetingAfterValidation = () => {
        return new Promise((resolve, reject) => {
            //console.log(req.body)
            let newMeeting = new meetingModel({
                meetingId: shortid.generate(),
                topic: req.body.topic,
                hostId: req.body.hostId,
                hostName: req.body.hostName,
                participantId: req.body.participantId,
                participantName: req.body.participantName,
                participantEmail: req.body.participantEmail,
                meetingStartDate: req.body.meetingStartDate,
                meetingEndDate: req.body.meetingEndDate,
                meetingDescription: req.body.meetingDescription,
                meetingPlace: req.body.meetingPlace,
                createdOn: time.now()
            })

            console.log(newMeeting)
            newMeeting.save((err, newMeeting) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'meetingController: addMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed to add new Meeting', 500, null)
                    reject(apiResponse)
                }
                else {
                    let newMeetingObj = newMeeting.toObject();
                    delete newMeetingObj._id;
                    delete newMeetingObj.__v;
                    resolve(newMeetingObj)
                }
            })

        })//adding meeting promise

    }// end addMeeting function

    validateUserInput(req, res)
        .then(addMeetingAfterValidation)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Meeting Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}//end of adding meeting

//updating meeting
let updateMeeting = (req, res) => {

    //finding meeting with id
    let findMeetingDetails = () => {
        return new Promise((resolve, reject) => {
            meetingModel.findOne({ 'meetingId': req.params.meetingId })
                .select('-id -__v')
                .lean()
                .exec((err, meetingDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Meeting Controller: findMeetingDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(meetingDetails)) {
                        logger.info('No Meeting Found', 'Meeting  Controller:findMeetingDetails')
                        let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Meeting Details Found', 200, meetingDetails)
                        resolve(meetingDetails)
                    }
                })
        })
    }// end findmeetingdetails

    //updating meeting promise
    let updateMeetingAfterFinding = (meetingDetails) => {
        return new Promise((resolve, reject) => {

            let options = req.body;
            meetingModel.update({ 'meetingId': req.params.meetingId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Meeting Controller:updateMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Meeting details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Meeting Found', 'Meeting Controller:updateMeeting', 5)
                    let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            });// end meeting model update

        })
    }// end updateMeetingAfterFinding promise

    findMeetingDetails(req, res)
        .then(updateMeetingAfterFinding)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Meeting Updated', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}//end of updating meeting

//deleting meeting by id
let deleteMeeting = (req, res) => {
    //finding meeting detail
    let findMeetingDetails = () => {
        return new Promise((resolve, reject) => {
            meetingModel.findOne({ 'meetingId': req.params.meetingId })
                .lean()
                .exec((err, meetingDetails) => {
                    if (err) {
                        logger.error(err.message, 'Meeting Controller: findMeetingDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(meetingDetails)) {
                        logger.info('No Meeting Found', 'Meeting Controller:findMeetingDetails', 5)
                        let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Meeting Details Found', 200, meetingDetails)
                        resolve(meetingDetails)
                    }
                })
        })
    }// end validate user input

    let deleteMeeting = (meetingDetails) => {
        return new Promise((resolve, reject) => {

            meetingModel.findOneAndRemove({ 'meetingId': req.params.meetingId }).exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'Meeting Controller: deleteMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed To delete Meeting', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Meeting Found', 'Meeting Controller: deleteMeeting', 5)
                    let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                    reject(apiResponse)
                } else {
                    let newMeetingObj = meetingDetails;
                    let apiResponse = response.generate(false, 'Deleted Meeting successfully', 200, result)
                    resolve(result)
                }
            });// end meeting model find and remove

        })
    }// end deleteMeeting promise

    findMeetingDetails(req, res)
        .then(deleteMeeting)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Deleted the Meeting successfully', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}//end of deleting meeting

let getAllMeetingsOfUser = (req, res) => {

    let validateUrlParam = () => {
        return new Promise((resolve, reject) => {
            if (req.params.userId) {
                resolve(req);
            }
            else {
                logger.error('no userId provided', 'meetingController:getAllMeetings:validateUrlParam', 10)
                let apiResponse = response.generate(true, 'missing userId', 400, null)
                reject(apiResponse)
            }
        })
    }// end finduserDetails

    let findMeetings = (req) => {
        return new Promise((resolve, reject) => {
            meetingModel.find({ 'participantId': req.params.userId })
                .select()
                .lean()
                .exec((err, meetingDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Meeting Controller: findMeetings', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Meetings', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(meetingDetails)) {
                        logger.info('No Meeting Found', 'Meeting  Controller:findMeetings')
                        let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(meetingDetails)
                    }
                })



        })
    }// end findMeetings


    validateUrlParam(req, res)
        .then(findMeetings)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Meetings Found and Listed', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end getAllMeetingsOfUser function

let getMeetingByMeetingId = (req, res) => {
    meetingModel.findOne({ 'meetingId': req.params.meetingId })
    .select('-__v -_id')
        .lean()
        .exec((err, meetingDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getMeetingByMeetingId', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meeting', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(meetingDetails)) {
                logger.info('No Meeting Found', 'Meeting Controller:getMeetingByMeetingId')
                let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Meeting Found', 200, meetingDetails)
                res.send(apiResponse)
            }
        })
}// end getMeetingDetailsFunction

module.exports = {
    addMeeting,
    updateMeeting,
    deleteMeeting,
    getAllMeetingsOfUser,
    getMeetingByMeetingId
}