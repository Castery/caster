'use strict';

import Promise from 'bluebird';

import { inspect } from 'util';

/**
 * Base all middleware
 *
 * @public
 */
export class Middleware {
	/**
	 * Constructor
	 */
	constructor (...middlewares) {
		this._stack = [];

		this.use(middlewares);
	}

	/**
	 * Add middlewares
	 *
	 * @param {Array} middlewares
	 */
	use (...middlewares) {
		for (const middleware of middlewares) {
			if (Array.isArray(middleware)) {
				this.use(...middleware);

				continue;
			}

			if (typeof middleware !== 'function') {
				throw new TypeError('Middleware must be composed of functions!');
			}

			this._stack.push(middleware);
		}
	}

	/**
	 * Launches the middleware chain
	 *
	 * @param {Array} args
	 *
	 * @return {Promise<boolean>}
	 */
	run (...args) {
		const middlewares = this._stack;

		let index = -1;
		const status = {
			isFinished: true,
			contexts: args
		};

		const next = async (i) => {
			if (i <= index) {
				throw new Error('next() called multiple times');
			}

			index = i;

			if (!(i in middlewares)) {
				status.isFinished = true;

				return status;
			}

			await middlewares[i](...args, () => next(i + 1));

			status.isFinished = middlewares.length <= index;

			return status;
		};

		return next(0);
	}

	/**
	 * Custom output to the console
	 *
	 * @return {string}
	 */
	inspect (depth, options) {
		return `${this.constructor.name} { ${inspect(this._stack, options)} }`;
	}
}
