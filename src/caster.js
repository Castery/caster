import createDebug from 'debug';
import { validate as joiValidate } from 'joi';

import Platform from './platform';
import Hears from './middlewares/hears';
import IncomingMiddleware from './middlewares/incoming';
import OutcomingMiddleware from './middlewares/outcoming';

import {
	defaultOptions,
	defaultOptionsSchema,
	MIDDLEWARE_PRIORITY as PRIORITY
} from './util/constants';

const debug = createDebug('caster');

/**
 * The main bot entry point
 *
 * @public
 */
export default class Caster {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options = {}) {
		this.options = { ...defaultOptions };

		this.started = false;
		this.hears = new Hears();
		this.platforms = new Set();

		this.incoming = new IncomingMiddleware();
		this.outcoming = new OutcomingMiddleware();

		this.setOptions(options);

		/* Register default hear */
		this.incoming.use({
			name: 'hear',
			priority: PRIORITY.HEAR,
			handler: this.hears.getMiddleware(),
			description: 'The built-in hear convenience middleware'
		});
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
			defaultOptionsSchema
		);

		if (error !== null) {
			throw error;
		}

		Object.assign(this.options, value);

		return this;
	}

	/**
	 * Returns the launch status of the bot
	 *
	 * @return {boolean}
	 */
	isStarted() {
		return this.started;
	}

	/**
	 * Running the bot
	 *
	 * @return {Promise}
	 */
	async start() {
		if (this.isStarted()) {
			debug('Bot already started');

			return;
		}

		this.started = true;

		for (const platform of this.platforms) {
			try {
				await platform.subscribe(this);
			} catch (error) {
				throw error;
			}
		}
	}

	/**
	 * Stops the bot
	 *
	 * @return {Promise}
	 */
	async stop() {
		if (!this.isStarted()) {
			debug('Bot already stopped!');

			return;
		}

		this.started = false;

		for (const platform of this.platforms) {
			try {
				await platform.unsubscribe(this);
			} catch (error) {
				throw error;
			}
		}
	}

	/**
	 * Register hear middleware
	 *
	 * @param {mixed}    conditions
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	hear(conditions, handler) {
		this.hears.use(conditions, handler);

		return this;
	}

	/**
	 * Adds a platform
	 *
	 * @param {Platform} platform
	 */
	addPlatform(platform) {
		this.platforms.add(platform);
	}

	/**
	 * Removes a platform
	 *
	 * @param {Platform} platform
	 */
	removePlatform(platform) {
		this.platforms.delete(platform);
	}

	/**
	 * Extends the functionality of caster
	 *
	 * @param {Object} Proto
	 * @param {Object} options
	 */
	use(Proto, options = {}) {
		/* Hack to dev */
		if ('start' in Proto && 'getPlatformName' in Proto) {
			this.addPlatform(Proto);

			return;
		}

		if (Proto instanceof Platform) {
			this.addPlatform(Proto);

			return;
		} else if (Proto.prototype instanceof Platform) {
			this.addPlatform(new Proto(options));

			return;
		}

		if ('name' in Proto && 'handler' in Proto) {
			this.incoming.use(Proto);

			return;
		}

		throw new Error('Unknown extension type');
	}

	/**
	 * Dispatching incoming middleware
	 *
	 * @param  {IncomingContext} context
	 *
	 * @return {Promise<Object>}
	 */
	dispatchIncoming(context) {
		return this.incoming.dispatch(context);
	}

	/**
	 * Dispatching outcoming middleware
	 *
	 * @param  {IncomingContext} context
	 *
	 * @return {Promise<Object>}
	 */
	dispatchOutcoming(context) {
		return this.outcoming.dispatch(context);
	}
}
