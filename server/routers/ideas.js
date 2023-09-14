const express = require('express');
const ideasRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('../db.js');

const checkMillionDollarIdea = require('../checkMillionDollarIdea.js');

ideasRouter.param("id", (req, res, next, id) => {
    const idea = getFromDatabaseById("ideas", id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    };
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase("ideas"));
});

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const idea = addToDatabase("ideas", req.body);
    res.status(201).send(idea);
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    const updatedidea = updateInstanceInDatabase("ideas", req.body);
    res.send(updatedidea);
});

ideasRouter.delete('/:id', (req, res, next) => {
    const deleted = deleteFromDatabasebyId("ideas", req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    };
    res.send();
});

module.exports = ideasRouter;