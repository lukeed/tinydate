var RGX = /([^{]*?)\w(?=\})/g

var dict = {
	YYYY: 'getFullYear',
	YY: 'getYear',
	MMMM: d => d.toLocaleString('default', { month: 'long' }),
	MMM: d => d.toLocaleString('default', { month: 'short' }),
	MM: d => d.getMonth() + 1,
	DD: 'getDate',
	HH: 'getHours',
	mm: 'getMinutes',
	ss: 'getSeconds',
	fff: 'getMilliseconds'
}

export default str => {
	var parts = [],
		offset = 0
	str.replace(RGX, (key, _, idx) => {
		// save preceding string
		parts.push(str.substring(offset, idx - 1))
		offset = idx += key.length + 1
		// save function
		parts.push(d =>
			('00' + (typeof dict[key] === 'string' ? d[dict[key]]() : dict[key](d))).slice(-key.length)
		)
	})

	if (offset !== str.length) {
		parts.push(str.substring(offset))
	}

	return arg => {
		var out = '',
			i = 0,
			d = arg || new Date()
		for (; i < parts.length; i++) {
			out += typeof parts[i] === 'string' ? parts[i] : parts[i](d)
		}
		return out
	}
}
