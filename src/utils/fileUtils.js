/**
 * Normalizes a file object or string into a consistent format.
 * @param {string|object} file - The file to normalize. Can be a string or an object.
 * @returns {object} - A normalized file object with `id` and `name` properties.
 */
export const normalizeFile = (file, index) => {
  if (typeof file === 'string') {
    return { id: index + 1, name: file }; // If the file is a string, assign a unique ID and use the string as the name
  }
  if (typeof file === 'object' && typeof file.name === 'string') {
    return { id: index + 1, name: file.name }; // Ensure the name is a string and assign a unique ID
  }
  throw new Error('Invalid file format'); // Throw an error for unsupported formats
};
