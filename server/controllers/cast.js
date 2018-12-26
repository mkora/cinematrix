import isMongoId from 'validator/lib/isMongoId';
import logger from '../utils/logger';
import Movie from '../models/movie';
import Person from '../models/person';
import validatorError from '../utils/validate/validatorError';

const validateCastData = (req) => {
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
  
}

export async function add(req, res, next) {
  try {
    const {
      personId,
      movieId,
    } = validateCastData(req);

    logger.debug(`Saving cast ${personId} of the movie ${movieId}`);

    const person = await Person.findById(personId);
    if (!person) {
      throw validatorError('Person not found. Please, check if provided data is correct');
    }
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw validatorError('Movie not found. Please, check if provided data is correct');
    }

    person.casted.push(movieId);
    await person.save();

    movie.casted.push(personId);
    await movie.save();

    logger.debug(`Cast ${person.name} of the ${movie.title} movie was saved`);

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
    } = validateCastData(req);

    logger.debug(`Removing cast ${personId} of the movie ${movieId}`);

    const person = await Person.findById(personId);
    if (!person) {
      throw validatorError('Person not found. Please, check if provided data is correct');
    }
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw validatorError('Movie not found. Please, check if provided data is correct');
    }

    // eslint-disable-next-line eqeqeq
    person.casted = person.casted.filter(v => v != movieId);
    await person.save();

    // eslint-disable-next-line eqeqeq
    movie.casted = movie.casted.filter(v => v != personId);
    await movie.save();

    logger.debug(`Cast ${person.name} of the ${movie.title} movie was removed`);

    return res
      .json({
        success: true,
        data: null,
      });
  } catch (err) {
    return next(err);
  }
}
