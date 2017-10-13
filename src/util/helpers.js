/**
 * Delay N-ms
 *
 * @param {number} delayed
 *
 * @return {Promise}
 */
export const delay = delayed => (
	new Promise(resolve => setTimeout(resolve, delayed))
);

/**
 * Specifies the sort order
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
export const sortOrder = (a, b) => (
	+(a > b) || +(a === b) - 1
);
