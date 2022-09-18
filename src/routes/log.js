const express = require('express');
const logRouter = express.Router();
const {
    setServerLog,
    setSemrushLog
} = require('../controllers/logController');
/**
 * Set routes that determines to send the requests that comes from the wordpress site to admin, semrush/project or 404 page.
 */
logRouter.post('/server', setServerLog);
logRouter.post('/semrush', setSemrushLog);

module.exports = logRouter;