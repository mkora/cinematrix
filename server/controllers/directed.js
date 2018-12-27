import isMongoId from 'validator/lib/isMongoId';
import logger from '../utils/logger';
import Movie from '../models/movie';
import Person from '../models/person';
import validatorError from '../utils/validate/validatorError';

const validateDirectedData = (req) => {
  const {
    personId,
    movieId,
  } = req.params;
  if (!isMongoId(personId)) {
    validatorError('Person ID is invalid. Please, provide a correct ID');
  }
  if (!isMongoId(movieId)) {
    validatorError('Movie ID is invalid. Please, provide a correct ID');
  }
  return {
    personId,
    movieId,
  };
};


export async function index(req, res, next) {
  try {
    const people = await Person
      .find({})
      .populate('directed')
      .where('directed').nor([
        { directed: { $exists: false } },
        { directed: { $size: 0 } },
      ]);
    logger.debug(`Looking for actors list. Found ${people.length}`);
    return res.json({
      success: true,
      data: people,
    });
  } catch (err) {
    return next(err);
  }
}

export async function add(req, res, next) {
  try {
    const {
      personId,
      movieId,
    } = validateDirectedData(req);

    logger.debug(`Saving the director ${personId} of the movie ${movieId}`);

    const person = await Person.findById(personId);
    if (!person) {
      throw validatorError('Person not found. Please, check if provided data is correct');
    }
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw validatorError('Movie not found. Please, check if provided data is correct');
    }

    person.directed.push(movieId);
    await person.save();

    movie.directed.push(personId);
    await movie.save();

    logger.debug(`Director ${person.name} of the ${movie.title} movie was saved`);

    return res
      .status(201)
      .json({
        success: true,
        data: null,
      });
  } catch (err) {
    return next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const {
      personId,
      movieId,
    } = validateDirectedData(req);

    logger.debug(`Removing the director ${personId} of the movie ${movieId}`);

    const person = await Person.findById(personId);
    if (!person) {
      throw validatorError('Person not found. Please, check if provided data is correct');
    }
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw validatorError('Movie not found. Please, check if provided data is correct');
    }

    // eslint-disable-next-line eqeqeq
    person.directed = person.directed.filter(v => v != movieId);
    await person.save();

    // eslint-disable-next-line eqeqeq
    movie.directed = movie.directed.filter(v => v != personId);
    await movie.save();

    logger.debug(`Director ${person.name} of the ${movie.title} movie was removed`);

    return res
      .json({
        success: true,
        data: null,
      });
  } catch (err) {
    return next(err);
  }
}
