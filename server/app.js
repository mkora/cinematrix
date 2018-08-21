import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import dotenv from 'dotenv';

import logger from './utils/logger';

dotenv.load({
  path: '.env',
});

/**
 * Controllers (route handlers)
 */
const indexController = require('./controllers/index');

/**
 * Create Express server
 */
const app = express();

/**
 * Configure Express
 */
app.set('port', process.env.PORT || 3030);
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors({
  exposedHeaders: ['Link'],
}));
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/build'));
}

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGOLAB_URI,
  { useNewUrlParser: true } // eslint-disable-line comma-dangle

);
mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error. Please make sure MongoDB is running');
  logger.debug(err);
  process.exit();
});

/**
 * API routes
 */
app.get('/api/index', indexController.index);

/**
 * Error Handler
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(errorHandler({
  log: (err, str, req, res) => {
    logger.error(str, err, req);
    res.status(err.code || 500);
  },
}));

module.exports = app;
