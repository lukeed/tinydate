const fs = require('fs');
const { resolve } = require('path');
const { minify } = require('uglify-js');
const pretty = require('pretty-bytes');
const sizer = require('gzip-size');
const pkg = require('./package');

const dist = resolve('dist');
const entry = resolve('src/index.js');

if (!fs.existsSync(dist)) {
	fs.mkdirSync(dist);
}

fs.readFile(entry, (_, buf) => {
	// copy as `es` module
	fs.writeFile(resolve(pkg.module), buf);

	// transform to `cjs` module
	const data = buf.toString().replace('export default', 'module.exports =');
	fs.writeFile(resolve(pkg.main), data);

	// produce minified output
	const { code } = minify(data, { fromString:true });
	const file = resolve(pkg.main.replace('.js', '.min.js'));
	fs.writeFile(file, code);

	// output gzip size
	const int = sizer.sync(code);
	console.log(`> gzip size: ${ pretty(int) }`);
});
