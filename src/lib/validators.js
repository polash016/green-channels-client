// Input validation utilities for Server Actions

/**
 * Validate product data before submission
 */
export function validateProductData(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Product name must be at least 2 characters');
  }
  
  if (!data.categoryId) {
    errors.push('Category is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate category data before submission
 */
export function validateCategoryData(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Category name must be at least 2 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate employee data before submission
 */
export function validateEmployeeData(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Employee name must be at least 2 characters');
  }
  
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate contact data before submission
 */
export function validateContactData(data) {
  const errors = [];
  
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters');
  }
  
  if (!data.body || data.body.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate password change data
 */
export function validatePasswordChange(data) {
  const errors = [];
  
  if (!data.currentPassword) {
    errors.push('Current password is required');
  }
  
  if (!data.newPassword || data.newPassword.length < 6) {
    errors.push('New password must be at least 6 characters');
  }
  
  if (data.newPassword !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
