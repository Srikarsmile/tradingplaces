/**
 * Email validation utility
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation utility
 * @param {string} password - Password to validate
 * @returns {{valid: boolean, errors: string[]}} - Validation result
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push("Password is required");
  } else {
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (password.length > 128) {
      errors.push("Password must be less than 128 characters");
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Username validation utility
 * @param {string} username - Username to validate
 * @returns {{valid: boolean, errors: string[]}} - Validation result
 */
export const validateUsername = (username) => {
  const errors = [];
  
  if (!username || username.trim().length === 0) {
    errors.push("Username is required");
  } else {
    if (username.length < 2) {
      errors.push("Username must be at least 2 characters");
    }
    if (username.length > 50) {
      errors.push("Username must be less than 50 characters");
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      errors.push("Username can only contain letters, numbers, underscores, and hyphens");
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Date of birth validation utility
 * @param {string} dob - Date of birth (YYYY-MM-DD format)
 * @returns {{valid: boolean, errors: string[]}} - Validation result
 */
export const validateDateOfBirth = (dob) => {
  const errors = [];
  
  if (!dob) {
    errors.push("Date of birth is required");
  } else {
    const date = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    
    if (isNaN(date.getTime())) {
      errors.push("Invalid date format");
    } else if (age < 13) {
      errors.push("You must be at least 13 years old");
    } else if (age > 120) {
      errors.push("Please enter a valid date of birth");
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};
