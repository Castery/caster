/**
 * General class of Caster errors
 *
 * @public
 */
export default class CasterError extends Error {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ message }) {
		super(message);

		this.message = message;
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Returns property for json
	 *
	 * @return {Object}
	 */
	toJSON() {
		const json = {};

		for (const key of Object.getOwnPropertyNames(this)) {
			json[key] = this[key];
		}

		return json;
	}
}
