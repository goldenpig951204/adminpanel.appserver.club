const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { notFound, errorHandler, adminMiddleware } = require('./middlewares/permission');
const app = express();
const {
    authorizeRouter,
    apiRouter,
} = require('./routes');
/**
 * Set global configuration.
 */
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
/**
 * Set global middleware
 */
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/authorize', authorizeRouter);
app.use(adminMiddleware);
app.use('/api', apiRouter);
app.use('/', (req, res) => {
    res.render('index.pug');
});
app.use(notFound);
app.use(errorHandler);

module.exports = app;
