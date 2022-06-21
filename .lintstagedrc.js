/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const prettier = require('prettier');

const extensions = prettier
	.getSupportInfo()
	.languages.flatMap((info) => info.extensions);
const extensionsToExclude = ['.js'];
const pattern = `*.{${extensions
	.filter((ext) => !extensionsToExclude.includes(ext))
	.map((ext) => ext.replace('.', ''))
	.join()}}`;

module.exports = {
	'*.js': ['prettier --check --write', 'eslint --fix'],
	[pattern]: 'prettier --check --write',
};
