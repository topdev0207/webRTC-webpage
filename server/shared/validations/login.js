import Validator from 'Validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.identifier)) {
    errors.identifier = 'This field is required';
  };

  if (Validator.isNull(data.password)) {
    errors.password = 'This field is required';
  };

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export default validateInput;