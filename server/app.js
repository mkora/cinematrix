import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import errorHandler from 'errorhandler';
import morgan from 'morgan';

// eslint-disable-next-line no-unused-vars
import dotenv from './utils/enver';
import logger from './utils/logger';
import indexController from './controllers/index';

const app = express();

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

app.get('/api/index', indexController.index);

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
