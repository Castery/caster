import Joi from 'joi';

export const contextSchema = Joi.object().unknown().keys({
	caster: Joi.object().required()
});

/**
 * Base all contexts
 *
 * @public
 */
export default class Context {
	/**
	 * Constructor
	 *
	 * @param {Caster} caster
	 */
	constructor(caster) {
		this.caster = caster;
	}

	/**
	 * Returns the Caster instance
	 *
	 * @return {Caster}
	 */
	getCaster() {
		return this.caster;
	}

	/**
	 * Returns the schema validation
	 *
	 * @return {JoiSchemaObject}
	 */
	getSchema() {
		return contextSchema;
	}
}
