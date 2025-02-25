/**
 * Utility functions for the application
 */

/**
 * Combines multiple class names into a single string
 * Similar to the clsx or classnames libraries
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date as a localized string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export function formatDate(date, options = {}) {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Date(date).toLocaleDateString('es-CL', mergedOptions);
}

/**
 * Format a currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: CLP)
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount, currency = 'CLP') {
  if (amount === undefined || amount === null) return '';
  
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency
  }).format(amount);
}

/**
 * Delay execution using a Promise
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after the delay
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random ID
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} Random ID
 */
export function generateId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 100)
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
}

export default {
  cn,
  formatDate,
  formatCurrency,
  delay,
  generateId,
  truncateText
}; 