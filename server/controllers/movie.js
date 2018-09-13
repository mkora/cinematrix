import validator from 'validator';
import logger from '../utils/logger';
import Movie from '../models/movie';

const validatorError = (text) => {
  const error = new Error(text);
  error.status = 400;
  return error;
};

const validateMongoID = (req) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    validatorError('ID is invalid. Please, provide a correct ID');
  }
  return id;
};

const validateMovieData = (req) => {
  if (Object.keys(req.body).length === 0) {
    throw validatorError('Request is empty. Please, provide at least required params');
  }
  let {
    title,
    alsoknown,
    country,
    synopsis,
  } = req.body;
  const {
    year,
    duration,
    imdb,
    episodes,
    source,
  } = req.body;

  if (title !== undefined && validator.isEmpty(title)) {
    throw validatorError('Title is required');
  }
  title = validator.escape(title);
  if (!validator.isLength(title, { min: 2, max: 500 })) {
    throw validatorError('Title length is invalid (max 2 and min 500 characters)');
  }

  if (country === undefined || validator.isEmpty(country)) {
    throw validatorError('Country is required');
  }
  if (country) {
    country = validator.escape(country);
  }
  if (!(country
    && validator.isLength(country, { min: 2, max: 500 }))) {
    throw validatorError('Country known length is invalid (max 2 and min 500 characters)');
  }

  if (year === undefined || validator.isEmpty(year)) {
    throw validatorError('Year is required');
  }
  if (!validator.isInt(year, { min: 1900, max: 2500 })) {
    throw validatorError('Year is invalid');
  }

  if (alsoknown) {
    alsoknown = validator.escape(alsoknown);
  }
  if (alsoknown
    && !validator.isLength(alsoknown, { min: 2, max: 500 })) {
    throw validatorError('Also known length is invalid (max 2 and min 500 characters)');
  }

  if (imdb
    && !validator.isFloat(imdb, { min: 0.1, max: 10.0 })) {
    throw validatorError('Imdb rating is invalid');
  }

  if (duration
    && !validator.isInt(duration, { min: 0, max: 10000 })) {
    throw validatorError('Duration (in min) is invalid');
  }

  if (episodes
    && !validator.isInt(episodes, { min: 1, max: 10000 })) {
    throw validatorError('Number of episodes is invalid');
  }

  if (synopsis) {
    synopsis = validator.escape(synopsis);
  }

  if (source
    && !validator.isURL(source)) {
    throw validatorError('Source URL is invalid');
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
      throw validatorError('Movie not found. Please, check if provided data is correct');
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
      throw validatorError('Movie not found. Please, check if provided data is correct');
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
      throw validatorError('Movie not found. Please, check if provided data is correct');
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
