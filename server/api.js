const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./routers/minions');
const ideasRouter = require('./routers/ideas');
const meetingsRouter = require('./routers/meetings');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
