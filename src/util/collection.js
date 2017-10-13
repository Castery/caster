import { sortOrder } from './helpers';

/**
 * A Map with additional utility methods
 *
 * @public
 */
export default class Collection extends Map {
	/**
	 * Constructor
	 *
	 * @param {Iterable} iterable
	 */
	constructor(iterable) {
		super(iterable);

		this.cacheValues = null;
		this.cacheKeys = null;
	}

	/**
	 * Creates a copy of the collection
	 *
	 * @return {Collection}
	 */
	clone() {
		return new Collection(this);
	}

	/**
	 * Adds or updates an element with a specified key
	 *
	 * @param {mixed} key
	 * @param {mixed} value
	 *
	 * @return {this}
	 */
	set(key, value) {
		this.cacheValues = null;
		this.cacheKeys = null;

		return super.set(key, value);
	}

	/**
	 * Removes the specified element
	 *
	 * @param {mixed} key
	 *
	 * @return {boolean}
	 */
	delete(key) {
		this.cacheValues = null;
		this.cacheKeys = null;

		return super.delete(key);
	}

	/**
	 * Obtains the first item in this collection
	 *
	 * @return {mixed}
	 */
	first() {
		return this.values().next().value;
	}

	/**
	 * Obtains the first key in this collection.
	 *
	 * @return {mixed}
	 */
	firstKey() {
		return this.keys().next().value;
	}

	/**
	 * Obtains the last item in this collection
	 *
	 * @return {mixed}
	 */
	last() {
		const values = this.cacheValuesArray();

		return values[values.length - 1];
	}

	/**
	 * Obtains the last key in this collection
	 *
	 * @return {mixed}
	 */
	lastKey() {
		const keys = this.cacheKeysArray();

		return keys[keys.length - 1];
	}

	/**
	 * Obtains a random item from this collection
	 *
	 * @return {mixed}
	 */
	random() {
		const values = this.cacheValuesArray();

		return values[
			Math.floor(Math.random() * values.length)
		];
	}

	/**
	 * Obtains a random key from this collection
	 *
	 * @return {mixed}
	 */
	randomKey() {
		const keys = this.cacheKeysArray();

		return keys[
			Math.floor(Math.random() * keys.length)
		];
	}

	/**
	 * Searches for all items
	 * where their specified property's value is identical to the given value
	 *
	 * @param {string} prop
	 * @param {mixed}  value
	 *
	 * @return {Array}
	 */
	findAll(prop, value) {
		const results = [];

		for (const item of this.values()) {
			if (item[prop] === value) {
				results.push(item);
			}
		}

		return results;
	}

	/**
	 * Searches for a single item
	 * where its specified property's value is identical to the given value
	 *
	 * @param {mixed} propOrFn
	 * @param {mixed} value
	 *
	 * @return {mixed}
	 */
	find(propOrFn, value) {
		if (typeof propOrFn === 'function') {
			for (const [key, val] of this) {
				if (propOrFn(val, key, this)) {
					return val;
				}
			}

			return null;
		}

		if (typeof value === 'undefined') {
			throw TypeError('Value must be specified');
		}

		for (const item of this.values()) {
			if (item[propOrFn] === value) {
				return item;
			}
		}

		return null;
	}

	/**
	 * Searches for the key of a single item
	 * where its specified property's value is identical to the given value
	 *
	 * @param {mixed} propOrFn
	 * @param {mixed} value
	 *
	 * @return {mixed}
	 */
	findKey(propOrFn, value) {
		if (typeof propOrFn === 'function') {
			for (const [key, val] of this) {
				if (propOrFn(val, key, this)) {
					return key;
				}
			}

			return null;
		}

		if (typeof value === 'undefined') {
			throw TypeError('Value must be specified');
		}

		for (const [key, val] of this) {
			if (val[propOrFn] === value) {
				return key;
			}
		}

		return null;
	}

	/**
	 * Searches for the existence of a single item
	 * where its specified property's value is identical to the given value
	 *
	 * @param {string} prop
	 * @param {mixed}  value
	 *
	 * @return {boolean}
	 */
	exists(prop, value) {
		return Boolean(this.find(prop, value));
	}

	/**
	 * Creates a new collection with all elements that pass the test
	 * implemented by the provided function
	 *
	 * @param {function} fn
	 *
	 * @return {Collection}
	 */
	filter(fn) {
		const results = new Collection();

		for (const [key, value] of this) {
			if (fn(value, key, this)) {
				results.set(key, value);
			}
		}

		return results;
	}

	/**
	 * Creates a new array with the results of calling a provided function
	 * on every element in this array
	 *
	 * @return {[type]} [description]
	 */
	map(fn) {
		const arr = new Array(this.size);

		let i = -1;

		for (const [key, value] of this) {
			i += 1;

			arr[i] = fn(value, key, this);
		}

		return arr;
	}

	/**
	 * Whether some element in the array passed the test
	 * implemented by the provided function.
	 *
	 * @param {function} fn
	 *
	 * @return {boolean}
	 */
	some(fn) {
		for (const [key, value] of this) {
			if (fn(value, key, this)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Whether all elements in the array pass the test
	 * implemented by the provided function
	 *
	 * @param {function} fn
	 *
	 * @return {boolean}
	 */
	every(fn) {
		for (const [key, value] of this) {
			if (!fn(value, key, this)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Applies a function against an accumulator and each element in the array
	 * (from left to right) to reduce it to a single value.
	 *
	 * @param {function} fn
	 * @param {mixed}    accumulator
	 *
	 * @return {mixed}
	 */
	reduce(fn, accumulator) {
		if (typeof accumulator !== 'undefined') {
			for (const [key, value] of this) {
				accumulator = fn(accumulator, value, key, this);
			}
		} else {
			let first = true;

			for (const [key, value] of this) {
				if (first) {
					first = false;
					accumulator = value;

					continue;
				}

				accumulator = fn(accumulator, value, key, this);
			}
		}

		return accumulator;
	}

	/**
	 * Combines this collection with others into a new collection
	 *
	 * @param {Collection} collections
	 *
	 * @return {Collection}
	 */
	concat(...collections) {
		const clone = this.clone();

		for (const collection of collections) {
			for (const [key, value] of collection) {
				clone.set(key, value);
			}
		}

		return clone;
	}

	/**
	 * Checks if this collection shares identical key-value pairings with another
	 *
	 * @param {Collection} collection
	 *
	 * @return {boolean}
	 */
	equals(collection) {
		if (!collection) {
			return false;
		}

		if (this === collection) {
			return true;
		}

		if (this.size !== collection.size) {
			return false;
		}

		return !this.find((value, key) => (
			collection.get(key) !== value
		));
	}

	/**
	 * The sort() method sorts the elements of a collection in place and returns the collection.
	 *
	 * @param {function} compare
	 *
	 * @return {Collection}
	 */
	sort(compare = sortOrder) {
		return new Collection(Array.from(this.entries())
			.sort((a, b) => (
				compare(a[1], b[1], a[0], b[0])
			)));
	}

	/**
	 * Values cache
	 *
	 * @return {Array}
	 */
	_valuesArray() {
		if (this.cacheValues === null || this.cacheValues.length !== this.size) {
			this.cacheValues = Array.from(this.values());
		}

		return this.cacheValues;
	}

	/**
	 * Keys cache
	 *
	 * @return {Array}
	 */
	_keysArray() {
		if (this.cacheKeys === null || this.cacheKeys.length !== this.size) {
			this.cacheKeys = Array.from(this.keys());
		}

		return this.cacheKeys;
	}
}
