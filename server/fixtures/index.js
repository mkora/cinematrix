import mongoose from 'mongoose';
import enver from '../utils/enver'; // eslint-disable-line no-unused-vars
import logger from '../utils/logger';
import * as loader from './loader';

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


// DEBUG! just for now
const debug = true;
if (debug) {
  loader.truncateAll();
}

loader.loadMovies();
loader.loadPeople();
// loader.loadCast();
// loader.loadDirected();
