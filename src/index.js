var RGX = /([^{]*?)\w(?=\})/g;

var dict = {
	YYYY: 'getFullYear',
	YY: 'getYear',
	MM: 'getMonth',
	DD: 'getDate',
	HH: 'getHours',
	mm: 'getMinutes',
	ss: 'getSeconds',
	ms: 'getMilliseconds'
};

export default function (str) {
	var parts=[], offset=0;
	str.replace(RGX, function (key, _, idx) {
		// save preceding string
		parts.push(str.substring(offset, idx - 1));
		offset = idx += key.length + 1;
		// save function
		parts.push(function(d){return d[dict[key]]()});
	});

	if (offset !== str.length) {
		parts.push(str.substring(offset));
	}

	return function (arg) {
		var out='', i=0;
		for (; i<parts.length; i++) {
			out += (typeof parts[i]==='string') ? parts[i] : parts[i](arg);
		}
		return out;
	};
}
