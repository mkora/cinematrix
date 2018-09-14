import isMongoId from 'validator/lib/isMongoId';
import validatorError from './validatorError';

export default function (req) {
  const { id } = req.params;
  if (!isMongoId(id)) {
    validatorError('ID is invalid. Please, provide a correct ID');
  }
  return id;
}
