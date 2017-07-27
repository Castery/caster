'use strict';

import CasterError from './caster';

/**
 * Unsupported attachment type
 *
 * @public
 */
export default class UnsupportedAttachmentType extends CasterError {
	constructor ({ type }) {
		super(`Unsupported attachment "${type}"`);
	}
}
