import CasterError from './caster';

/**
 * Unsupported event type
 *
 * @public
 */
export default class UnsupportedContextTypeError extends CasterError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ type }) {
		super({
			message: `Unsupported context type "${type}"`
		});
	}
}
