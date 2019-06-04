const test = require('tape');
const fn = require('../dist/tinydate');

const foo = new Date('5/1/2017, 4:30:09 PM');
const render = (str, ctx) => fn(str)(ctx || foo);

test('tinydate', t => {
	t.equal(typeof fn, 'function', 'exports a function');
	t.end();
});

test('tinydate()', t => {
	t.equal(typeof fn(''), 'function', 'returns a function');
	t.end();
});

test('rendering', t => {
	t.equal(render('foo'), 'foo', 'does nothing if no match');
	t.equal(render('HH'), 'HH', 'does nothing if no `{}` wrappers');
	t.equal(render('{MM}'), '05', 'returns numerical month');
	t.equal(render('{DD}'), '01', 'returns numerical day');
	t.equal(render('{YY}'), '17', 'returns partial year');
	t.equal(render('{YYYY}'), '2017', 'returns full year');
	t.equal(render('{HH}'), '16', 'returns full hours (24h)');
	t.equal(render('{mm}'), '30', 'returns padded minutes');
	t.equal(render('{ss}'), '09', 'returns seconds');

	t.equal(render('{fff}'), '000', 'returns milliseconds (default 000)');
	t.equal(render('{fff}', new Date(1559607289771)), '771', 'returns milliseconds');

	// formats
	t.equal(render('[{HH}:{mm}:{ss}]'), '[16:30:09]', 'returns formatted time string');
	t.equal(render('The date is {MM}/{DD}/{YYYY}!'), 'The date is 05/01/2017!', 'returns formatted date string');
	t.equal(render('Created on: [{YYYY}-{MM}-{DD} ~ {HH}:{mm}:{ss}.{fff}]'), 'Created on: [2017-05-01 ~ 16:30:09.000]', 'kitchen sink');
	t.end();
});
