'use strict';

import Joi from 'joi';

/**
 * Priority of middleware
 *
 * @type {Object}
 */
export const MIDDLEWARE_PRIORITY = {
	DEFAULT: 0,
	PLATFORM: 200
};

/**
 * Default options bot
 *
 * @type {Object}
 *
 * @property {?string} [name] Name bot
 */
export const defaultOptions = {
	//
};

/**
 * Default options schema validate
 *
 * @type {Object}
 *
 * @extends {defaultOptions}
 */
export const defaultOptionsSchema = Joi.object().keys({
	//
});
