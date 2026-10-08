const test = require('tape');
const fn = require('../dist/tinydate');

test('short years before 1900', t => {
	const stamp = fn('{YY}');
	for (const year of [1, 50, 99, 1801, 1851, 1899, 1900, 2001]) {
		const date = new Date(0);
		date.setFullYear(year);
		t.is(stamp(date), ('0' + (year % 100)).slice(-2), 'short year for ' + year);
	}
	t.end();
});
