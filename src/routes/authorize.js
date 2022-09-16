const express = require('express');
const { authMiddleware } = require('../middlewares/permission');
const authorizeRouter = express.Router();
/**
 * Set routes that determines to send the requests that comes from the wordpress site to admin, semrush/project or 404 page.
 */
authorizeRouter.use('/', authMiddleware, (req, res) => {
    res.status(301).redirect('/');
});

module.exports = authorizeRouter;