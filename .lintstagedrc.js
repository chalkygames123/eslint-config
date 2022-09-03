module.exports = {
	'*.js': ['prettier --check --write', 'eslint --fix'],
	'!*.js': 'prettier --check --write --ignore-unknown',
};
