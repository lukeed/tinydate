'use strict';

const RGX = /([YMDHms]{2,4})(:\/)?/g;

export default function (pattern) {
	if (typeof pattern !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof pattern}`);
	}

	return pattern + ' & rainbows';
}
