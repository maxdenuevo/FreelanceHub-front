/**
 * Helper utility functions for the FreelanceHub application
 */

/**
 * Format a date as a readable string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'es-CL')
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'es-CL', options = {}) => {
  if (!date) return '';
  
  try {
    const defaultOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    
    return new Date(date).toLocaleDateString(
      locale, 
      { ...defaultOptions, ...options }
    );
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'CLP')
 * @param {string} locale - Locale for formatting (default: 'es-CL')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'CLP', locale = 'es-CL') => {
  if (amount === undefined || amount === null) return '';
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return String(amount);
  }
};

/**
 * Format a phone number to a standardized format
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove non-numeric characters
  const cleaned = String(phone).replace(/\D/g, '');
  
  // Format as Chilean phone number
  if (cleaned.length === 9) {
    return `+56 ${cleaned.slice(0, 1)} ${cleaned.slice(1, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 8) {
    return `+56 2 ${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  
  return phone;
};

/**
 * Truncate text to a certain length and add ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate a random password that meets requirements
 * @param {number} length - Password length
 * @returns {string} Random password
 */
export const generatePassword = (length = 12) => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+{}:"<>?|[];\',./';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  
  // Ensure at least one of each required character type
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  
  // Fill the rest with random characters
  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Shuffle the password characters
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
};

/**
 * Validate a Chilean RUT
 * @param {string} rut - RUT to validate
 * @returns {boolean} Whether the RUT is valid
 */
export const validateRut = (rut) => {
  if (!rut) return false;
  
  // Remove dots and dashes
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
  
  // Check for valid format
  if (!/^[0-9]{7,8}[0-9Kk]$/.test(cleanRut)) return false;
  
  // Split the RUT into number and verification digit
  const rutDigits = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();
  
  // Calculate the verification digit
  let sum = 0;
  let multiplier = 2;
  
  for (let i = rutDigits.length - 1; i >= 0; i--) {
    sum += parseInt(rutDigits[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const calculatedDV = 11 - (sum % 11);
  const expectedDV = calculatedDV === 11 ? '0' : calculatedDV === 10 ? 'K' : calculatedDV.toString();
  
  return expectedDV === dv;
};

/**
 * Format a Chilean RUT
 * @param {string} rut - RUT to format
 * @returns {string} Formatted RUT
 */
export const formatRut = (rut) => {
  if (!rut) return '';
  
  // Remove dots and dashes
  let cleaned = rut.replace(/\./g, '').replace(/-/g, '');
  
  // Extract the verification digit
  const dv = cleaned.slice(-1);
  const rutDigits = cleaned.slice(0, -1);
  
  // Format the digits with dots
  let formatted = '';
  let counter = 0;
  
  for (let i = rutDigits.length - 1; i >= 0; i--) {
    formatted = rutDigits[i] + formatted;
    counter++;
    
    if (counter === 3 && i !== 0) {
      formatted = '.' + formatted;
      counter = 0;
    }
  }
  
  // Add the verification digit
  formatted = `${formatted}-${dv}`;
  
  return formatted;
};

export default {
  formatDate,
  formatCurrency,
  formatPhoneNumber,
  truncateText,
  generatePassword,
  validateRut,
  formatRut
}; 