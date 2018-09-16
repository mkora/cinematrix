import validator from 'validator';
import logger from '../utils/logger';
import Person from '../models/person';
import validateMongoID from '../utils/validate/validateMongoID';
import validatorError from '../utils/validate/validatorError';

const validatePersonData = (req, required = true) => {
  if (Object.keys(req.body).length === 0) {
    throw validatorError('Request is empty. Please, provide at least required params');
  }
  let {
    firstname,
    lastname,
    birthplace,
  } = req.body;
  const {
    birthday,
    deathday,
    source,
  } = req.body;

  if (required
    && (firstname !== undefined && validator.isEmpty(firstname))) {
    throw validatorError('Firstname is required');
  }
  if (firstname) {
    firstname = validator.escape(firstname);
  }
  if (firstname
    && !validator.isLength(firstname, { min: 2, max: 100 })) {
    throw validatorError('Firstname length is invalid (max 2 and min 100 characters)');
  }

  if (required
    && (lastname !== undefined && validator.isEmpty(lastname))) {
    throw validatorError('Lastname is required');
  }
  if (lastname) {
    lastname = validator.escape(lastname);
  }
  if (lastname
    && !validator.isLength(lastname, { min: 2, max: 100 })) {
    throw validatorError('Lastname length is invalid (max 2 and min 100 characters)');
  }

  if (birthday
    && !validator.isISO8601(birthday)) { // eq 2011-10-05T14:48:00.000Z & js .toISOString()
    throw validatorError('Birthday date is invalid');
  }

  if (deathday
    && !validator.isISO8601(deathday)) {
    throw validatorError('Date of death is invalid');
  }

  if (birthplace) {
    birthplace = validator.escape(birthplace);
  }
  if (birthplace
    && !validator.isLength(birthplace, { min: 2, max: 500 })) {
    throw validatorError('Birth place length is invalid (max 2 and min 500 characters)');
  }

  if (source
    && !validator.isURL(source)) {
    throw validatorError('Source URL is invalid');
  }

  return {
    ...(firstname !== undefined ? { firstname } : {}),
    ...(lastname !== undefined ? { lastname } : {}),
    ...(birthday !== undefined ? { birthday } : {}),
    ...(birthplace !== undefined ? { birthplace } : {}),
    ...(deathday !== undefined ? { deathday } : {}),
    ...(source !== undefined ? { source } : {}),
  };
};

export async function index(req, res, next) {
  try {
    const people = await Person
      .find({})
      .populate('directed')
      .populate('casted');
    logger.debug(`Looking for people list. Found ${people.length}`);
    return res.json({
      success: true,
      data: people,
    });
  } catch (err) {
    return next(err);
  }
}

export async function view(req, res, next) {
  try {
    const id = validateMongoID(req);
    const person = await Person
      .findById(id)
      .populate('directed')
      .populate('casted');
    logger.debug(`Looking for person of ${id} id. Found?`);
    if (!person) {
      throw validatorError('Person not found. Please, check if provided data is correct');
    }
    logger.debug(person);
    return res.json({
      success: true,
      data: person,
    });
  } catch (err) {
    return next(err);
  }
}

export async function add(req, res, next) {
  try {
    const {
      firstname,
      lastname,
      birthday,
      birthplace,
      deathday,
      source,
    } = validatePersonData(req);
    const person = new Person({
      firstname,
      lastname,
      birthday,
      birthplace,
      deathday,
      source,
    });
    const saved = await person.save();
    logger.debug('Saving a new person. Saved?');
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
    const data = validatePersonData(req, false);
    const person = await Person.findByIdAndUpdate(id, data, { new: true });
    logger.debug(`Saving for person of ${id} id. Found?`);
    if (!person) {
      throw validatorError('Person not found. Please, check if provided data is correct');
    }
    logger.debug(person);
    console.log(person);
    return res
      .json({
        success: true,
        data: person,
      });
  } catch (err) {
    return next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const id = validateMongoID(req);
    const person = await Person.findByIdAndDelete(id);
    logger.debug(`Deleting for person of ${id} id. Found?`);
    if (!person) {
      throw validatorError('Person not found. Please, check if provided data is correct');
    }
    logger.debug(person);
    return res
      .json({
        success: true,
        data: null,
      });
  } catch (err) {
    return next(err);
  }
}
