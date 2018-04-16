import * as Joi from 'joi';

import nodeUtil from 'util';

import Context, { contextSchema } from '../context';
import { contextProps, defaultSupportedContextTypes } from '../utils/constants';

const { inspect } = nodeUtil;

const { SUPPORTED_CONTEXT_TYPES } = contextProps;

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
export default class IncomingContext extends Context {
	/**
	 * @inheritdoc
	 */
	constructor(caster) {
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
	static defaultSupportedContextTypes(types) {
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
	hasSupportedType(name) {
		const types = this[SUPPORTED_CONTEXT_TYPES];

		if (!types || !(name in types)) {
			return null;
		}

		return types[name];
	}

	/**
	 * @inheritdoc
	 */
	getSchema() {
		return incomingSchema;
	}

	/**
	 * Returns the type
	 *
	 * @return {string}
	 */
	getType() {
		return this.type;
	}

	/**
	 * Returns the platform identifier
	 *
	 * @return {mixed}
	 */
	getPlatformId() {
		return this.platform.id;
	}

	/**
	 * Returns the platform name
	 *
	 * @return {string}
	 */
	getPlatformName() {
		return this.platform.name;
	}

	/**
	 * Returns the raw
	 *
	 * @return {?Object}
	 */
	getRaw() {
		return this.raw;
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
		const out = {};

		for (const key of Object.keys(this)) {
			/* Ignores private properties */
			if (key.startsWith('_')) {
				continue;
			}

			if (key === 'caster') {
				continue;
			}

			out[key] = this[key];
		}

		if (out.raw !== null) {
			out.raw = '<raw event>';
		}

		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} ${inspect(out, options)}`;
	}
}
