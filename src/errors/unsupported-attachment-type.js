import CasterError from './caster';

/**
 * Unsupported attachment type
 *
 * @public
 */
export default class UnsupportedAttachmentTypeError extends CasterError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ type }) {
		super({
			message: `Unsupported attachment "${type}"`
		});
	}
}
