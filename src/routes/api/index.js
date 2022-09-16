const express = require('express');
const apiRouter = express.Router();
const apiSemrushRouter = require('./semrush');
const apiSitesRouter = require('./sites');
const apiLogsRouter = require('./logs');
/** 
 * Set routes according to endpoint
 */
apiRouter.use('/semrush', apiSemrushRouter);
apiRouter.use('/sites', apiSitesRouter);
apiRouter.use('/logs', apiLogsRouter);

module.exports = apiRouter;