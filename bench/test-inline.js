var RGX = /([YMDHms]{2,4})(:\/)?/g;

var dict = {
	YYYY: 'getFullYear',
	YY: 'getFullYear',
	MM: 'getMonth',
	DD: 'getDate',
	HH: 'getHours',
	mm: 'getMinutes',
	ss: 'getSeconds'
};

function compile(d, str) {
	return str.replace(RGX, function (_, k, s) {
		var fn = dict[k];
		return fn ? d[fn]() : _;
	});
}

module.exports = function (str) {
	return {
		stamp: function (d) {
			return compile(d, str);
		}
	};
};
