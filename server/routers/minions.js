const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('../db.js');

minionsRouter.param("minionId", (req, res, next, id) => {
    const minion = getFromDatabaseById("minions", id);
    if (minion) {
        req.minion = minion;
    } else {
        res.status(404).send();
    };
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase("minions"));
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.post('', (req, res, next) => {
    
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId("minions", req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    };
    res.send();
});

module.exports = minionsRouter;