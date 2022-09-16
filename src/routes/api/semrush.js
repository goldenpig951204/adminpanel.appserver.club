const express = require('express');
const { 
    login,
    getSetting,
    setSetting,
    getSites
 } = require('../../controllers/api/semrushController');
const apiSemrushRouter = express.Router();

/**
 * Set www.semrush.com-related routes.
 */
apiSemrushRouter.post('/login', login);
apiSemrushRouter.get('/setting', getSetting);
apiSemrushRouter.post('/setting', setSetting);
apiSemrushRouter.get('/sites', getSites);

module.exports = apiSemrushRouter;