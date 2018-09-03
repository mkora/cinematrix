import logger from '../utils/logger';
import Movie from '../models/movie';

export async function index(req, res, next) {
  try {
    const movie = await Movie
      .find({});
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
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    logger.debug(`Looking for movie of ${id} id. Found?`);
    if (!movie) {
      const notFound = new Error('Movie Not Found');
      notFound.status = 404;
      throw notFound;
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
    const movie = new Movie({
      title: req.body.title,
      alsoknown: req.body.alsoknown,
      year: req.body.year,
      country: req.body.country,
      duration: req.body.duration,
      imdb: req.body.imdb,
      episodes: req.body.episodes,
      synopsis: req.body.synopsis,
      source: req.body.source,
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
    const { id } = req.params;
    const movie = Movie.findByIdAndUpdate(id, req.body, { new: true });
    logger.debug(`Saving for movie of ${id} id. Found?`);
    if (!movie) {
      const notFound = new Error('Movie Not Found');
      notFound.status = 404;
      throw notFound;
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
    const { id } = req.params;
    const movie = Movie.findByIdAndDelete(id);
    logger.debug(`Deleting for movie of ${id} id. Found?`);
    if (!movie) {
      const notFound = new Error('Movie Not Found');
      notFound.status = 404;
      throw notFound;
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
