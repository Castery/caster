'use strict';

/**
 * Object order sorting
 *
 * @param {Object} a
 * @param {Object} b
 *
 * @return {number}
 */
export const prioritySort = (a, b) => {
	if (a.priority > b.priority) {
		return 1;
	}

	if (a.priority < b.priority) {
		return -1;
	}

	return 0;
};

/**
 * Returns the value of the object path
 *
 * @param {Object} link
 * @param {string} path
 * @param {mixed}  value
 *
 * @return {mixed}
 */
export const getObjectPath = (link, path, value = null) => {
	for (const part of path.split('.')) {
		if (typeof link !== 'object' || !(part in link)) {
			return value;
		}

		link = link[part];
	}

	return link;
};
