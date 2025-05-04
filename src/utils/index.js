/**
 * Generates a unique ID for tasks using a timestamp and random string.
 * @returns {string} A unique ID in the format 'task-timestamp-random'.
 */
export const generateID = () => {
  const timestamp = Date.now().toString(36); // Base36 timestamp for brevity
  const random = Math.random().toString(36).substring(2, 8); // 6-char random string
  return `task-${timestamp}-${random}`;
};

/**
 * Saves data to local storage under the specified key.
 * @param {string} [key='store'] - The key for local storage.
 * @param {Object} data - The data to save.
 * @returns {boolean} True if successful, false if an error occurs.
 */
export const saveToLocalStorage = (key = 'store', data) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save to local storage:', error);
    return false;
  }
};

/**
 * Retrieves and parses data from local storage by key.
 * @param {string} key - The key for local storage.
 * @returns {Object|null} The parsed data or null if not found/invalid.
 */
export const getFromLocalStorage = (key) => {
  try {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to retrieve from local storage:', error);
    return null;
  }
};
