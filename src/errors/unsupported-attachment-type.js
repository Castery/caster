import CasterError from './caster';

/**
 * Unsupported attachment type
 *
 * @public
 */
export default class UnsupportedAttachmentType extends CasterError {
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
