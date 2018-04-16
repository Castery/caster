import * as Joi from 'joi';

import Events from 'events';

const { validate: joiValidate } = Joi;

const defaultOptionsSchema = Joi.object().keys({
	adapter: Joi.object()
});

/**
 * Base all platforms
 *
 * @public
 */
export default class Platform extends Events {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		super();

		this.options = {};

		this.started = false;
	}

	/**
	 * Sets options
	 *
	 * @param {Object} options
	 *
	 * @return {this}
	 */
	setOptions(options) {
		const { error, value } = joiValidate(
			options,
			this.getOptionsSchema()
		);

		if (error !== null) {
			throw error;
		}

		Object.assign(this.options, value);

		return this;
	}

	/**
	 * Returns options
	 *
	 * @return {Object}
	 */
	getOptions() {
		return this.options;
	}

	/**
	 * Returns the joi validation scheme
	 *
	 * @return {Object}
	 */
	getOptionsSchema() {
		return defaultOptionsSchema;
	}

	/**
	 * Returns platform adapter
	 *
	 * @return {Object}
	 */
	getAdapter() {
		return null;
	}

	/**
	 * Returns the launch status of the platform
	 *
	 * @return {boolean}
	 */
	isStarted() {
		return this.started;
	}

	/**
	 * Running the platform
	 *
	 * @return {Promise}
	 */
	async start() {
		//
	}

	/**
	 * Stops the platform
	 *
	 * @return {Promise}
	 */
	async stop() {
		//
	}

	/**
	 * Subscribe caster for platform events
	 *
	 * @param {Caster} caster
	 *
	 * @return {Promise}
	 */
	async subscribe(caster) {
		//
	}

	/**
	 * Unsubscribe caster for platform events
	 *
	 * @param {Caster} caster
	 *
	 * @return {Promise}
	 */
	async unsubscribe(caster) {
		//
	}
}
