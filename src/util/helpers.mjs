import uuid from 'uuid/v4';
import chalk from 'chalk';

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

/**
 * Generate warning log
 *
 * @param {string} name
 *
 * @export {Function}
 */
export const generateWarningLog = name => (
	(...args) => {
		// eslint-disable-next-line no-console
		console.log(chalk.yellow(`${name}:warning -`), ...args);
	}
);

/**
 * Generate random uuid
 *
 * @type {Function}
 */
export const generateRandomID = uuid;
