const express = require('express');
const { getLogs } = require('../../controllers/api/logController');
const apiLogsRouter = express.Router();
/**
 * Set log-related routes
 */
apiLogsRouter.get('/', getLogs);

module.exports = apiLogsRouter;
