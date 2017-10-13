import CasterError from './caster';

/**
 * Unsupported event type
 *
 * @public
 */
export default class UnsupportedContextType extends CasterError {
	constructor({ type }) {
		super({
			message: `Unsupported context type "${type}"`
		});
	}
}
