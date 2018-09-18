import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import errorHandler from 'errorhandler';
import morgan from 'morgan';

// eslint-disable-next-line no-unused-vars
import dotenv from './utils/enver';
import logger from './utils/logger';
import * as MovieController from './controllers/movie';
import * as PersonController from './controllers/person';
import * as CastController from './controllers/cast';
import * as DirectedController from './controllers/directed';

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

app.get('/api/movies', MovieController.index);
app.get('/api/movies/:id', MovieController.view);
app.post('/api/movies/add', MovieController.add);
app.put('/api/movies/:id/edit', MovieController.edit);
app.delete('/api/movies/:id/remove', MovieController.remove);

app.get('/api/people', PersonController.index);
app.get('/api/people/:id', PersonController.view);
app.post('/api/people/add', PersonController.add);
app.put('/api/people/:id/edit', PersonController.edit);
app.delete('/api/people/:id/remove', PersonController.remove);

app.post('/api/cast/:personId/add/:movieId', CastController.add);
app.delete('/api/cast/:personId/remove/:movieId', CastController.remove);

app.post('/api/directed/:personId/add/:movieId', DirectedController.add);
app.delete('/api/directed/:personId/remove/:movieId', DirectedController.remove);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler({
  log: (err, str, req, res) => {
    // logger.error(str, err, req);
    res.status(err.code || 500);
  },
}));

module.exports = app;
