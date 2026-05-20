import { REGEX, ERROR_MESSAGES } from './constants';

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  if (!email) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (!REGEX.EMAIL.test(email)) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }
  return null;
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  if (!password) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (password.length < 8) {
    return ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
  }
  return null;
};

/**
 * Validate strong password
 */
export const validateStrongPassword = (password) => {
  const basicError = validatePassword(password);
  if (basicError) return basicError;
  
  if (!REGEX.PASSWORD.test(password)) {
    return ERROR_MESSAGES.PASSWORD_REQUIREMENTS;
  }
  return null;
};

/**
 * Validate password confirmation
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (password !== confirmPassword) {
    return ERROR_MESSAGES.PASSWORDS_NOT_MATCH;
  }
  return null;
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (!REGEX.PHONE.test(phone)) {
    return ERROR_MESSAGES.INVALID_PHONE;
  }
  return null;
};

/**
 * Validate min length
 */
export const validateMinLength = (value, minLength, fieldName = 'Field') => {
  if (!value || value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

/**
 * Validate max length
 */
export const validateMaxLength = (value, maxLength, fieldName = 'Field') => {
  if (value && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }
  return null;
};

/**
 * Validate number
 */
export const validateNumber = (value, fieldName = 'Field') => {
  if (isNaN(value)) {
    return `${fieldName} must be a number`;
  }
  return null;
};

/**
 * Validate min value
 */
export const validateMin = (value, min, fieldName = 'Field') => {
  const numberError = validateNumber(value, fieldName);
  if (numberError) return numberError;
  
  if (Number(value) < min) {
    return `${fieldName} must be at least ${min}`;
  }
  return null;
};

/**
 * Validate max value
 */
export const validateMax = (value, max, fieldName = 'Field') => {
  const numberError = validateNumber(value, fieldName);
  if (numberError) return numberError;
  
  if (Number(value) > max) {
    return `${fieldName} must not exceed ${max}`;
  }
  return null;
};

/**
 * Validate form
 */
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = values[field];
    
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};