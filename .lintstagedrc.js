module.exports = {
	'*.js': ['eslint --fix', 'prettier --check --write'],
	'!*.js': 'prettier --check --write --ignore-unknown',
};
