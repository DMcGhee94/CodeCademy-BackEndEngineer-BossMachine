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
        next();
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

minionsRouter.post('/', (req, res, next) => {
    const minion = addToDatabase("minions", req.body);
    res.status(201).send(minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase("minions", req.body);
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    };
    res.send();
});

minionsRouter.get("/:minionId/work/", (req, res, next) => {
    const work = getAllFromDatabase("work").filter((singleWork) => {
        return singleWork.minionId === req.params.minionId;
    })
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase("work", workToAdd);
    res.status(201).send(createdWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    const updatedWork = updateInstanceInDatabase("work", req.params.workId);
    res.send(updatedWork);
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId("work", req.params.workId);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    };
});

module.exports = minionsRouter;