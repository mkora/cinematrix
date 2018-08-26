import fixtures from 'node-mongoose-fixtures';
import mongoose from 'mongoose';
import promise from 'bluebird';
import enver from '../utils/enver'; // eslint-disable-line no-unused-vars
import logger from '../utils/logger';

import movies from './movies';
import people from './person';
import casted from './cast';
import directed from './directed';
import {
  Movie,
  Person,
  Directed,
  Casted,
} from '../models/';

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

promise.promisifyAll(fixtures.prototype);

const fixtureSeed = async () => {
  try {
    await fixtures({
      Movie: movies,
      Person: people,
    }, mongoose);
    await Promise.all(casted.map(async ({ movie, person }) => {
      const movieObj = await Movie.findOneByTitle(movie);
      const personObj = await Person.findOneByName(person);
      const cast = new Casted();
      cast.movie = movieObj._id; // eslint-disable-line no-underscore-dangle
      cast.person = personObj._id; // eslint-disable-line no-underscore-dangle
      await cast.save();
    }));
    await Promise.all(directed.map(async ({ movie, person }) => {
      const movieObj = await Movie.findOneByTitle(movie);
      const personObj = await Person.findOneByName(person);
      const directed = new Directed();
      directed.movie = movieObj._id; // eslint-disable-line no-underscore-dangle
      directed.person = personObj._id; // eslint-disable-line no-underscore-dangle
      await directed.save();
    }));
    logger.debug('All fixtures were saved');
  } catch (err) {
    logger.error('Mongo seeding faild');
    logger.debug(err);
    process.exit();
  }
};

const fixtureTrunc = async () => {
  try {
    const result = fixtures.reset();
    logger.debug('Collections were truncated');
    return result;
  } catch (err) {
    logger.error('Mongo reset faild');
    logger.debug(err);
    process.exit();
  }
};

// DEBUG! just for now
const debug = true;
if (debug) {
  fixtureTrunc();
}
fixtureSeed();
