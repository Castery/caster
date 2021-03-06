import Middleware from 'middleware-io/lib/index';

import { getObjectPath } from './helpers';

/**
 * Convenient context listening
 *
 * @public
 */
export default class Hears {
	/**
	 * Constructor
	 */
	constructor() {
		this.middleware = new Middleware();
	}

	/**
	 * Register middleware
	 *
	 * @param {mixed}    conditions
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	use(conditions, handler) {
		if (typeof conditions !== 'object' || conditions instanceof RegExp || Array.isArray(conditions)) {
			conditions = { text: conditions };
		}

		const keys = Object.keys(conditions);

		this.middleware.use(async (context, next) => {
			const result = keys.every((key) => {
				const condition = conditions[key];
				const value = getObjectPath(context, key);

				if (typeof condition === 'function') {
					return condition(value, context);
				}

				if (condition instanceof RegExp) {
					return condition.test(value);
				}

				if (Array.isArray(condition)) {
					if (!Array.isArray(value)) {
						return condition.some(cond => (
							cond === value
						));
					}

					return condition.every(cond => value.includes(cond));
				}

				return condition === value;
			});

			if (result) {
				if (handler.length === 2) {
					await handler(context, next);

					return;
				}

				await handler(context);
			}

			await next();
		});

		return this;
	}

	/**
	 * Returns the handler for middleware
	 *
	 * @return {Function}
	 */
	getMiddleware() {
		return async (context, next) => {
			const { finished } = await this.middleware.run(context);

			if (finished) {
				await next();
			}
		};
	}
}
