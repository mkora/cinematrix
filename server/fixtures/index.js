import fixtures from 'node-mongoose-fixtures';
import mongoose from 'mongoose';
import logger from '../utils/logger';
import enver from '../utils/enver'; // eslint-disable-line no-unused-vars
import Movie from '../models/movie'; // eslint-disable-line no-unused-vars
import movies from './movies';

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

fixtures({
  Movie: movies,
}, (err, data) => { // eslint-disable-line no-unused-vars
  if (err) {
    logger.error('Mongo seeding faild');
    logger.debug(err);
    process.exit();
  }
  logger.debug('Data added');
});
