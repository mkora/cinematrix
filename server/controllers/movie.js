import logger from '../utils/logger';

export async function index(req, res, next) {
  return res.json({
    message: 'view movies',
  });
}

export async function view(req, res, next) {
  return res.json({
    message: `view movie id = ${req.params.id}`,
  });
}

export async function add(req, res, next) {
  return res.json({
    message: 'add movie',
  });
}

export async function edit(req, res, next) {
  return res.json({
    message: `edit movie id = ${req.params.id}`,
  });
}

export async function remove(req, res, next) {
  return res.json({
    message: `delete movie id = ${req.params.id}`,
  });
}
