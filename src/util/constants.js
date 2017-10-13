import Joi from 'joi';

/**
 * Priority of middleware
 *
 * @type {Object}
 */
export const MIDDLEWARE_PRIORITY = {
	HEAR: 20,
	DEFAULT: 10,
	PLATFORM: 200
};

/**
 * Private context props
 *
 * @type {Object}
 */
export const CONTEXT_PROPS = {
	SUPPORTED_CONTEXT_TYPES: Symbol('SupportedContextTypes'),
	SUPPORTED_ATTACHMENT_TYPES: Symbol('SupportedAttachmentTypes')
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
 * Default supported platform  types
 *
 * @type {Object}
 */
export const defaultSupportedContextTypes = {
	message: false
};

/**
 * Default supported platform attachments
 *
 * @type {Object}
 */
export const defaultSupportedAttachmentTypes = {
	image: false,
	video: false
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
