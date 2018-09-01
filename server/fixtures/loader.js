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
  try {
    logger.debug('Loading people. Starting...');
    await Promise.all(people.map(async (data) => {
      const person = new Person();
      person.set(data);
      logger.debug(`Saving person ${data.firstname} ${data.lastname}...`);
      await person.save();
    }));
    logger.debug('Loading people. Saved');
  } catch (err) {
    logger.error('Loading people. Mongo references seeding faild');
    logger.debug(err);
    process.exit();
  }
}

export async function loadMovies() {
  try {
    logger.debug('Loading movies. Starting...');
    await Promise.all(movies.map(async (data) => {
      const movie = new Movie();
      movie.set(data);
      logger.debug(`Saving movie ${data.title}...`);
      await movie.save();
    }));
    logger.debug('Loading movies. Saved');
  } catch (err) {
    logger.error('Loading movies. Mongo references seeding faild');
    logger.debug(err);
    process.exit();
  }
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
      logger.debug(`Saving cast ${person} in ${movie}...`);
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
      logger.debug(`Saving director ${person} for ${movie}...`);
      await directed.save();
    }));
    logger.debug('Loading directed. Saved');
  } catch (err) {
    logger.error('Loading directed. Mongo references seeding faild');
    logger.debug(err);
    process.exit();
  }
}
