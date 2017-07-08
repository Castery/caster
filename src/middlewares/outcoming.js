'use strict';

import Joi from 'joi';
import generateUUID from 'uuid';

import { IncomingMiddleware, schemaUseIncoming } from './incoming';
import { MIDDLEWARE_PRIORITY as PRIORITY } from '../util/constants';

// export const schemaUseOutcoming = schemaUseIncoming.keys({
// 	//
// });
export const schemaUseOutcoming = schemaUseIncoming;

/**
 * Outcoming events
 *
 * @public
 */
export class OutcomingMiddleware extends IncomingMiddleware {
	/**
	 * Constructor
	 */
	constructor () {
		super();

		this._platforms = new Map;
	}

	/**
	 * @inheritdoc
	 */
	forEach (fn) {
		return super.forEach((value, key, arr) => {
			/* Ignores platforms */
			if (value.type === 'platform') {
				return;
			}

			return fn(value, key, arr);
		});
	}

	/**
	 * @inheritdoc
	 */
	find (fn) {
		return super.find((value, key, arr) => {
			/* Ignores platforms */
			if (value.type === 'platform') {
				return false;
			}

			return fn(value, key, arr);
		});
	}

	/**
	 * @inheritdoc
	 */
	filter (fn) {
		return super.filter((value, key, arr) => {
			/* Ignores platforms */
			if (value.type === 'platform') {
				return true;
			}

			return fn(value, key, arr);
		});
	}

	/**
	 * Adds a platform
	 *
	 * @param {Platform} platform
	 * @param {Function} handler
	 */
	addPlatform (platform, handler) {
		if (this._platforms.has(platform)) {
			return this;
		}

		const name = `outcoming-${platform.getPlatformName()}-${generateUUID()}`;

		this._platforms.set(platform, name);

		return this.use({
			name,
			handler,
			type: 'platform',
			priority: PRIORITY.PLATFORM
		});
	}

	/**
	 * Removes a platform
	 *
	 * @param {Platform} platform
	 *
	 * @return {this}
	 */
	removePlatform (platform) {
		if (this._platforms.has(platform)) {
			return this;
		}

		const name = this._platforms.get(platform);
		this._platforms.delete(platform);

		this._stack = this._stack.filter((middleware) => (
			middleware.name !== name
		));

		return this.reload();
	}

	/**
	 * @inheritdoc
	 */
	getSchemaUse () {
		return schemaUseOutcoming;
	}
}
