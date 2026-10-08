const test = require('tape');
const fn = require('../dist/tinydate');

test('full year has four digits', t => {
	const stamp = fn('{YYYY}');
	for (const year of [0, 1, 9, 10, 99, 100, 999, 1000, 2017]) {
		const date = new Date(0);
		date.setFullYear(year);
		t.is(stamp(date), ('000' + year).slice(-4), 'full year for ' + year);
	}
	t.end();
});
