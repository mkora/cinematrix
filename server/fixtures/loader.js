import logger from '../utils/logger';

import movies from './data/movies';
import people from './data/person';
import casted from './data/cast';
import directed from './data/directed';
import {
  Movie,
  Person,
  Directed,
  Casted,
} from '../models/';

export async function truncateAll() {
  try {
    await Movie.truncate();
    await Person.truncate();
    await Directed.truncate();
    await Casted.truncate();
    logger.debug('Collections truncated');
  } catch (err) {
    logger.error('Mongo reset faild');
    logger.debug(err);
    process.exit();
  }
}

export async function loadPeople() {
  logger.debug('Coming soon');
}

export async function loadMovies() {
  logger.debug('Coming soon');
}

export async function loadCast() {
  try {
    logger.debug('Loading cast. Starting...');
    await Promise.all(casted.map(async ({ movie, person }) => {
      const movieObj = await Movie.findOneByTitle(movie);
      const personObj = await Person.findOneByName(person);
      const cast = new Casted();
      cast.movie = movieObj._id; // eslint-disable-line no-underscore-dangle
      cast.person = personObj._id; // eslint-disable-line no-underscore-dangle
      logger.debug(`Saving ${person} to ${movie}...`);
      await cast.save();
    }));
    logger.debug('Loading cast. Saved');
  } catch (err) {
    logger.error('Loading cast. Mongo references seeding faild');
    logger.debug(err);
    process.exit();
  }
}

export async function loadDirected() {
  try {
    logger.debug('Loading directed. Starting...');  
    await Promise.all(directed.map(async ({ movie, person }) => {
      const movieObj = await Movie.findOneByTitle(movie);
      const personObj = await Person.findOneByName(person);
      const directed = new Directed();
      directed.movie = movieObj._id; // eslint-disable-line no-underscore-dangle
      directed.person = personObj._id; // eslint-disable-line no-underscore-dangle
      logger.debug(`Saving ${person} to ${movie}...`);
      await directed.save();
    }));
    logger.debug('Loading directed. Saved');
  } catch (err) {
    logger.error('Loading directed. Mongo references seeding faild');
    logger.debug(err);
    process.exit();
  }
}
