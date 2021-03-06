import * as Joi from 'joi';
import Middleware from 'middleware-io/lib/index';

import nodeUtil from 'util';

import { prioritySort } from './helpers';
import { middlewarePriority as priority } from '../utils/constants';

const { inspect } = nodeUtil;
const { validate: JoiValidate } = Joi;

export const schemaUseIncoming = Joi.object().keys({
	name: Joi.string().required(),
	handler: Joi.func().required(),
	enabled: Joi.boolean().default(true),
	type: Joi.string().default('handler'),
	priority: Joi.number().default(priority.DEFAULT),
	description: Joi.string().default('No description')
});

/**
 * Incomings middleware
 *
 * @public
 */
export default class IncomingMiddleware {
	/**
	 * Constructor
	 */
	constructor() {
		this.stack = [];

		this.middleware = new Middleware();
	}

	/**
	 * Returns the schema use
	 *
	 * @return {JoiSchemaObject}
	 */
	getSchemaUse() {
		return schemaUseIncoming;
	}

	/**
	 * Register new incoming middleware
	 *
	 * @param {Object} middlewareRaw
	 */
	use(middlewareRaw) {
		const { error, value: middleware } = JoiValidate(
			middlewareRaw,
			this.getSchemaUse()
		);

		if (error !== null) {
			throw error;
		}

		const { name: middlewareName } = middleware;

		if (this.stack.some(({ name }) => middlewareName === name)) {
			throw new Error('Another middleware with the same name has already been registered');
		}

		this.stack.push(middleware);

		if (middleware.enabled) {
			/* Resorting  with the new middleware */
			this.sort();
		}

		return this;
	}

	/**
	 * Dispatch middleware chain
	 *
	 * @param {Context} context
	 *
	 * @return {Promise<boolean>}
	 */
	dispatch(contextRaw) {
		const { error, value: context } = JoiValidate(
			contextRaw,
			contextRaw.getSchema()
		);

		if (error !== null) {
			return Promise.reject(error);
		}

		return this.middleware.run(context);
	}

	/**
	 * For each middleware
	 *
	 * @param  {Function} fn
	 *
	 * @return {this}
	 */
	forEach(fn) {
		this.stack.forEach(fn);

		return this.reload();
	}

	/**
	 * Filter middlewares
	 *
	 * @param {Function} fn
	 *
	 * @return {this}
	 */
	filter(fn) {
		this.stack = this.stack.filter(fn);

		return this.reload();
	}

	/**
	 * Produces sorting of middleware
	 *
	 * @param {Function} fn
	 *
	 * @return {this}
	 */
	sort(fn = prioritySort) {
		this.stack.sort(fn);

		return this.reload();
	}

	/**
	 * Searches for a single item
	 *
	 * @param {Function} fn
	 *
	 * @return {?Object}
	 */
	find(fn) {
		return this.stack.find(fn) || null;
	}

	/**
	 * Reboot middleware
	 *
	 * @return {this}
	 */
	reload() {
		const middlewares = this.stack
			.filter(middleware => (
				middleware.enabled
			))
			.map(middleware => (
				middleware.handler
			));

		this.middleware = new Middleware(middlewares);

		return this;
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} { ${inspect(this.stack, options)} }`;
	}
}
