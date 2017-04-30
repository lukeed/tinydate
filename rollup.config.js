const buble = require('rollup-plugin-buble');
const pkg = require('./package');

export default {
	useStrict: false,
	entry: 'src/index.js',
	plugins: [
		buble({
			transforms: {
        modules: false
      }
    })
	],
	targets: [
		{dest: pkg.main, format: 'cjs'},
		{dest: pkg.module, format: 'es'}
	]
};
