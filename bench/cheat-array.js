const arr = [
	d => '[',
	d => d.getHours(),
	d => ':',
	d => d.getMinutes(),
	d => ':',
	d => d.getSeconds(),
	d => ']'
];

module.exports = function (d) {
	var out = '', i = 0;
		// if (typeof parts[i]==='string') out += parts[i];
		// else out += '' + parts[i](arg);
		// out += (typeof parts[i]==='string') ? parts[i] : ('' + parts[i](arg));
	for (; i<arr.length; i++) {
		out += arr[i](d);
	}
	return out;
};
