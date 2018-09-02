import logger from '../utils/logger';

export async function index(req, res, next) {
  return res.json({
    message: 'view people',
  });
}

export async function view(req, res, next) {
  return res.json({
    message: `view person id = ${req.params.id}`,
  });
}

export async function add(req, res, next) {
  return res.json({
    message: 'add person',
  });
}

export async function edit(req, res, next) {
  return res.json({
    message: `edit person id = ${req.params.id}`,
  });
}

export async function remove(req, res, next) {
  return res.json({
    message: `delete person id = ${req.params.id}`,
  });
}
