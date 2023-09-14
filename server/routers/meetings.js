const express = require('express');
const meetingsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
    createMeeting
} = require('../db.js');

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post('/', (req, res, next) => {
    const meeting = addToDatabase("meetings", createMeeting());
    res.status(201).send(meeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const deletedMeetings = deleteAllFromDatabase("meetings");
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;