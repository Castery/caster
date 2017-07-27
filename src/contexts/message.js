'use strict';

import Joi from 'joi';

import { inspect } from 'util';

import { IncomingContext, incomingSchema } from './incoming';
import { CONTEXT_PROPS, defaultSupportedAttachmentTypes } from '../util/constants';

const { SUPPORTED_ATTACHMENT_TYPES } = CONTEXT_PROPS;

export const messageSchema = incomingSchema.keys({
	[SUPPORTED_ATTACHMENT_TYPES]: Joi.object(),

	attachments: Joi.array().allow(),
	text: Joi.string().required().allow(null)
});

/**
 * Base all incoming context
 *
 * @public
 */
export class MessageContext extends IncomingContext {
	/**
	 * @inheritdoc
	 */
	constructor (caster) {
		super(caster);

		this.type = 'message';
		this.text = null;
	}

	/**
	 * Returns supported platform attachment types
	 *
	 * @param {Object} attachments
	 *
	 * @return {Object}
	 */
	static defaultSupportedAttachmentTypes (types) {
		return {
			...defaultSupportedAttachmentTypes,
			...types
		};
	}

	/**
	 * Checks for platform attachment type support
	 *
	 * @param {string} name
	 *
	 * @return {?boolean}
	 */
	hasSupportedAttachment (name) {
		const types = this[SUPPORTED_ATTACHMENT_TYPES];

		if (!Boolean(types) || !(name in types)) {
			return null;
		}

		return types[name];
	}

	/**
	 * Returns the text
	 *
	 * @return {string}
	 */
	getText () {
		return this.text;
	}

	/**
	 * Hide private property to inspect
	 *
	 * @return {string}
	 */
	inspect (depth, options) {
		const out = {};

		for (const key of Object.keys(this)) {
			/* Ignores private properties */
			if (key.startsWith('_')) {
				continue;
			}

			out[key] = this[key];
		}

		delete out.caster;

		return this.constructor.name + ' ' + inspect(out);
	}
}
