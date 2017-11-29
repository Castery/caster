import Joi from 'joi';

/**
 * Priority of middleware
 *
 * @type {Object}
 */
export const middlewarePriority = {
	BEFORE: -Infinity,
	AFTER: Infinity,

	BEFORE_BOOTSTRAP: -20,
	BOOTSTRAP: 15,
	AFTER_BOOTSTRAP: 10,

	BEFORE_DEFAULT: 5,
	DEFAULT: 10,
	AFTER_DEFAULT: 15,

	BEFORE_COMMAND: 20,
	COMMAND: 25,
	AFTER_COMMAND: 30,

	BEFORE_HEAR: 35,
	HEAR: 40,
	AFTER_HEAR: 45,

	BEFORE_PLATFORM: 195,
	PLATFORM: 200,
	AFTER_PLATFORM: 205
};

/**
 * Private context props
 *
 * @type {Object}
 */
export const contextProps = {
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
	voice: false,
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
