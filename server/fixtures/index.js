import mongoose from 'mongoose';
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

const fixtureReference = async () => {
  try {
    /*
      coming up
    */
    return true;    
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
    logger.debug('All references were saved');
  } catch (err) {
    logger.error('Mongo references seeding faild');
    logger.debug(err);
    process.exit();
  }
};

const fixtureTrunc = async () => {
  try {
    /*
      coming up
    */
    logger.debug('Collections were truncated');
  } catch (err) {
    logger.error('Mongo reset faild');
    logger.debug(err);
    process.exit();
  }
};

// DEBUG! just for now
const debug = true;
(async () => {
  if (debug) {
    await fixtureTrunc();
  }
  await fixtureReference();
})();
