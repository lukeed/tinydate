const test = require('tape');
const fn = require('../dist/tinydate');

const foo = new Date('5/1/2017, 4:30:09 PM');
const render = (str, ctx) => fn(str)(ctx || foo);

test('tinydate', t => {
	t.is(typeof fn, 'function', 'exports a function');
	t.end();
});

test('tinydate()', t => {
	t.is(typeof fn(''), 'function', 'returns a function');
	t.end();
});

test('rendering', t => {
	t.is(render('foo'), 'foo', 'does nothing if no match');
	t.is(render('HH'), 'HH', 'does nothing if no `{}` wrappers');
	t.is(render('{MM}'), '05', 'returns numerical month');
	t.is(render('{DD}'), '01', 'returns numerical day');
	t.is(render('{YY}'), '17', 'returns partial year');
	t.is(render('{YYYY}'), '2017', 'returns full year');
	t.is(render('{HH}'), '16', 'returns full hours (24h)');
	t.is(render('{mm}'), '30', 'returns padded minutes');
	t.is(render('{ss}'), '09', 'returns seconds');

	t.is(render('{fff}'), '000', 'returns milliseconds (default 000)');
	t.is(render('{fff}', new Date(1559607289771)), '771', 'returns milliseconds');

	// formats
	t.is(render('[{HH}:{mm}:{ss}]'), '[16:30:09]', 'returns formatted time string');
	t.is(render('The date is {MM}/{DD}/{YYYY}!'), 'The date is 05/01/2017!', 'returns formatted date string');
	t.is(render('Created on: [{YYYY}-{MM}-{DD} ~ {HH}:{mm}:{ss}.{fff}]'), 'Created on: [2017-05-01 ~ 16:30:09.000]', 'kitchen sink');

	t.end();
});
