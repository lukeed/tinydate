'use strict';

const RGX = /([YMDHms]{2,4})(:\/)?/g;

const offsets = {
	YYYY: ['getFullYear', 4],
	YY: ['getFullYear', 2],
	// getMonth is zero-based, thus the extra increment field
	MM: ['getMonth', 2, 1],
	DD: ['getDate', 2],
	HH: ['getHours', 2],
	mm: ['getMinutes', 2],
	ss: ['getSeconds', 2],
	ms: ['getMilliseconds', 3]
};

export default function (pattern) {
	if (typeof pattern !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof pattern}`);
	}

	function render(date) {
		return pattern.replace(RGX, function(_, key, sep) {
	    var incr = offsets[key];
	    if (!incr) return _;

	    var res = '00' + String(date[incr[0]]() + (incr[2] || 0));
	    return res.slice(-incr[1]) + (sep || '');
	  })
	}

	return { render };
};
