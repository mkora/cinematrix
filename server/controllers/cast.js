import logger from '../utils/logger';

export async function add(req, res, next) {
  return res.json({
    message: `add ${req.params.personId} to ${req.params.movieId} movie`,
  });
}

export async function remove(req, res, next) {
  return res.json({
    message: `add ${req.params.personId} to ${req.params.movieId} movie`,
  });
}
