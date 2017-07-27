'use strict';

import Joi from 'joi';

import { Context, contextSchema } from '../context';
import { CONTEXT_PROPS, defaultSupportedContextTypes } from '../util/constants';

const { SUPPORTED_CONTEXT_TYPES } = CONTEXT_PROPS;

export const incomingSchema = contextSchema.keys({
	[SUPPORTED_CONTEXT_TYPES]: Joi.object(),

	platform: Joi.object().keys({
		id: Joi.any().required(),
		name: Joi.string().required()
	}),
	from: Joi.object().keys({
		id: Joi.any().required(),
		type: Joi.string().required()
	}),
	to: Joi.object().keys({
		id: Joi.any().required(),
		type: Joi.string().required()
	}),
	type: Joi.string().required(),
	raw: Joi.object().allow(null)
});

/**
 * Base all incoming context
 *
 * @public
 */
export class IncomingContext extends Context {
	/**
	 * @inheritdoc
	 */
	constructor (caster) {
		super(caster);

		this.type = 'incoming';
	}

	/**
	 * Returns supported platform types
	 *
	 * @param {Object} types
	 *
	 * @return {Object}
	 */
	static defaultSupportedContextTypes (types) {
		return {
			...defaultSupportedContextTypes,
			...types
		};
	}

	/**
	 * Checks whether the platform supports the context type
	 *
	 * @param {string} name
	 *
	 * @return {?boolean}
	 */
	hasSupportedType (name) {
		const types = this[SUPPORTED_CONTEXT_TYPES];

		if (!Boolean(types) || !(name in types)) {
			return null;
		}

		return types[name];
	}

	/**
	 * @inheritdoc
	 */
	getSchema () {
		return incomingSchema;
	}

	/**
	 * Returns the type
	 *
	 * @return {string}
	 */
	getType () {
		return this.type;
	}

	/**
	 * Returns the platform identifier
	 *
	 * @return {mixed}
	 */
	getPlatformId () {
		return this.platform.id;
	}

	/**
	 * Returns the platform name
	 *
	 * @return {string}
	 */
	getPlatformName () {
		return this.platform.name;
	}

	/**
	 * Returns the raw
	 *
	 * @return {?Object}
	 */
	getRaw () {
		return this.raw;
	}
}
