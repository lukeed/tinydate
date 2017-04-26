const test = require('tape');
const fn = require('../');

test('title', t => {
	t.equal(fn('unicorns'), 'unicorns & rainbows');
	t.end();
});
