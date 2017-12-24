/**
 * Delay N-ms
 *
 * @param {number} delayed
 *
 * @return {Promise}
 */
// eslint-disable-next-line import/prefer-default-export
export const delay = delayed => (
	new Promise(resolve => setTimeout(resolve, delayed))
);
