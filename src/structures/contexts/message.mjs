import * as Joi from 'joi';

import IncomingContext, { incomingSchema } from './incoming';
import { contextProps, defaultSupportedAttachmentTypes } from '../../utils/constants';

const { SUPPORTED_ATTACHMENT_TYPES } = contextProps;

export const messageSchema = incomingSchema.keys({
	[contextProps.SUPPORTED_ATTACHMENT_TYPES]: Joi.object(),

	attachments: Joi.array().allow(),
	text: Joi.string().required().allow(null)
});

/**
 * Base all incoming context
 *
 * @public
 */
export default class MessageContext extends IncomingContext {
	/**
	 * @inheritdoc
	 */
	constructor(caster) {
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
	static defaultSupportedAttachmentTypes(types) {
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
	hasSupportedAttachment(name) {
		const types = this[SUPPORTED_ATTACHMENT_TYPES];

		if (!types || !(name in types)) {
			return null;
		}

		return types[name];
	}

	/**
	 * Returns the text
	 *
	 * @return {string}
	 */
	getText() {
		return this.text;
	}
}
