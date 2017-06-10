'use strict';

import Promise from 'bluebird';

import createDebug from 'debug';
import { validate as joiValidate } from 'joi';

import { Platform } from './platform';
import { Hears } from './middlewares/hears';
import { IncomingMiddleware } from './middlewares/incoming';
import { OutcomingMiddleware } from './middlewares/outcoming';

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
export class Caster {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor (options = {}) {
		this.options = Object.assign({}, defaultOptions);

		this._isStarted = false;
		this._hears = new Hears;
		this._platforms = new Set;

		this.incoming = new IncomingMiddleware;
		this.outcoming = new OutcomingMiddleware;

		this.setOptions(options);

		/* Register default hear */
		this.incoming.use({
			name: 'hear',
			priority: PRIORITY.DEFAULT,
			handler: this._hears.getMiddleware(),
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
	setOptions (options) {
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
	isStarted () {
		return this._isStarted;
	}

	/**
	 * Running the bot
	 *
	 * @return {Promise<void>}
	 */
	async start () {
		if (this.isStarted()) {
			return void debug('Bot already started');
		}

		this._isStarted = true;

		for (const platform of this._platforms) {
			try {
				await platform.subscribe(this);
			} catch (error) {
				/* TODO: Add actions on stop error */
				console.log(error);
			}
		}

		return;
	}

	/**
	 * Stops the bot
	 *
	 * @return {Promise<void>}
	 */
	async stop () {
		if (!this.isStarted()) {
			return void debug('Bot already stopped!');
		}

		this._isStarted = false;

		for (const platform of this._platforms) {
			try {
				await platform.unsubscribe(this);
			} catch (error) {
				/* TODO: Add actions on stop error */
				console.log(error);
			}
		}

		return;
	}

	/**
	 * Register hear middleware
	 *
	 * @param {mixed}    conditions
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	hear (conditions, handler) {
		this._hears.use(conditions, handler);

		return this;
	}

	/**
	 * Adds a platform
	 *
	 * @param {Platform} platform
	 */
	addPlatform (platform) {
		this._platforms.add(platform);
	}

	/**
	 * Removes a platform
	 *
	 * @param {Platform} platform
	 */
	removePlatform () {
		this._platforms.delete(platform);
	}

	/**
	 * Extends the functionality of caster
	 *
	 * @param {Object} proto
	 */
	use (proto) {
		if (proto instanceof Platform) {
			return void this.addPlatform(proto);
		}

		if ('name' in proto && 'handler' in proto) {
			this.incoming.use(proto);

			return;
		}

		throw new Error('Unknown extension type');
	}

	/**
	 * Dispatching incoming middleware
	 *
	 * @param  {IncomingContext} context
	 *
	 * @return {Promise<boolean>}
	 */
	dispatchIncoming (context) {
		return this.incoming.dispatch(context)
		.catch((error) => {
			console.error(error);

			throw error;
		});
	}

	/**
	 * Dispatching outcoming middleware
	 *
	 * @param  {OutcomingContext} context
	 *
	 * @return {Promise<boolean>}
	 */
	dispatchOutcoming (context) {
		return this.outcoming.dispatch(context)
		.catch((error) => {
			console.error(error);

			throw error;
		});
	}
}
