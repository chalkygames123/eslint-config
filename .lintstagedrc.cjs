'use strict';

module.exports = {
	'*.js': ['eslint --fix', 'prettier --check --write'],
	'!*.js': 'prettier --check --write --ignore-unknown',
	'package.json': () => ['npm install', 'git add package-lock.json'],
};
