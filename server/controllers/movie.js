import validator from 'validator';
import logger from '../utils/logger';
import Movie from '../models/movie';

const validateMongoID = (req) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    const err = new Error('ID is invalid. Please, provide a correct ID');
    err.status = 400;
    throw err;
  }
  return id;
};

const validateMovieData = (req) => {
  const {
    title,
    alsoknown,
    year,
    country,
    duration,
    imdb,
    episodes,
    synopsis,
    source,
  } = req.body;

  let error = null;

  if (validator.isEmpty(title)
    || validator.isEmpty(year)
    || validator.isEmpty(country)) {
    error = new Error('Title, year and county are required');
  }

  if (!validator.isLength(title, { min: 2, max: 500 })) {
    error = new Error('Title length is invalid (max 2 and min 500 characters)');
  }
  if (!(alsoknown
    && validator.isLength(alsoknown, { min: 2, max: 500 }))) {
    error = new Error('Also known length is invalid (max 2 and min 500 characters)');
  }
  if (!(country
    && validator.isLength(country, { min: 2, max: 500 }))) {
    error = new Error('Country known length is invalid (max 2 and min 500 characters)');
  }

  if (!validator.isInt(year, { min: 1900, max: 2500 })) {
    error = new Error('Year is invalid');
  }

  if (!(imdb
    && validator.isDecimal(imdb, { decimal_digits: '0,10' }))) {
    error = new Error('Imdb rating is invalid');
  }

  if (!(duration
    && validator.isInt(duration, { min: 0, max: 10000 }))) {
    error = new Error('Duration (in min) is invalid ()');
  }

  if (!(episodes
    && validator.isInt(episodes, { min: 1, max: 10000 }))) {
    error = new Error('Number of episodes is invalid');
  }

  if (!(source
    && validator.isURL(source))) {
    error = new Error('Source URL is invalid');
  }

  if (error) {
    error.status = 400;
    throw error;
  }

  return {
    title,
    alsoknown,
    year,
    country,
    duration,
    imdb,
    episodes,
    source,
    synopsis,
  };
};

export async function index(req, res, next) {
  try {
    const movie = await Movie
      .find({})
      .populate('directed')
      .populate('casted');
    logger.debug(`Looking for movies list. Found ${movie.length}`);
    return res.json({
      success: true,
      data: movie,
    });
  } catch (err) {
    return next(err);
  }
}

export async function view(req, res, next) {
  try {
    const id = validateMongoID(req);
    const movie = await Movie
      .findById(id)
      .populate('directed')
      .populate('casted');
    logger.debug(`Looking for movie of ${id} id. Found?`);
    if (!movie) {
      const error = new Error('Movie not found. Please, check if provided data is correct');
      error.status = 404;
      throw error;
    }
    logger.debug(movie);
    return res.json({
      success: true,
      data: movie,
    });
  } catch (err) {
    return next(err);
  }
}

export async function add(req, res, next) {
  try {
    const {
      title,
      alsoknown,
      year,
      country,
      duration,
      imdb,
      episodes,
      synopsis,
      source,
    } = validateMovieData(req);
    const movie = new Movie({
      title,
      alsoknown,
      year,
      country,
      duration,
      imdb,
      episodes,
      synopsis,
      source,
    });
    const saved = await movie.save();
    logger.debug('Saving a new movie. Saved?');
    logger.debug(saved);
    return res
      .status(201)
      .json({
        success: true,
        data: saved,
      });
  } catch (err) {
    return next(err);
  }
}

export async function edit(req, res, next) {
  try {
    const id = validateMongoID(req);
    const data = validateMovieData(req);
    const movie = Movie.findByIdAndUpdate(id, data, { new: true });
    logger.debug(`Saving for movie of ${id} id. Found?`);
    if (!movie) {
      const error = new Error('Movie not found. Please, check if provided data is correct');
      error.status = 404;
      throw error;
    }
    logger.debug(movie);
    return res
      .json({
        success: true,
        data: movie,
      });
  } catch (err) {
    return next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const id = validateMongoID(req);
    const movie = Movie.findByIdAndDelete(id);
    logger.debug(`Deleting for movie of ${id} id. Found?`);
    if (!movie) {
      const error = new Error('Movie not found. Please, check if provided data is correct');
      error.status = 404;
      throw error;
    }
    logger.debug(movie);
    return res
      .status(204)
      .json({
        success: true,
        data: null,
      });
  } catch (err) {
    return next(err);
  }
}
