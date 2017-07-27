'use strict';

import CasterError from './caster';

/**
 * Unsupported event type
 *
 * @public
 */
export default class UnsupportedContextType extends CasterError {
	constructor ({ type }) {
		super(`Unsupported context type "${type}"`);
	}
}
