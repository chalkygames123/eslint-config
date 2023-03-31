// @ts-check

'use strict';

const { join } = require('node:path');

const { defineConfig } = require('eslint-define-config');

const commonPluginConfigs = [
	'plugin:@eslint-community/eslint-comments/recommended',
	'plugin:import/recommended',
	'plugin:jsdoc/recommended',
	'plugin:no-use-extend-native/recommended',
	'plugin:regexp/recommended',
	'plugin:unicorn/recommended',
];

const tsPluginConfigs = [
	'plugin:@typescript-eslint/recommended',
	'plugin:@typescript-eslint/recommended-requiring-type-checking',
	'plugin:@typescript-eslint/strict',
	'plugin:import/typescript',
];

const nodePluginConfigs = ['plugin:n/recommended'];

const testPluginConfigs = [
	'plugin:jest/recommended',
	'plugin:jest/style',
	'plugin:n/recommended',
];

const browserPluginConfigs = ['plugin:vue/vue3-recommended'];

const nodeParserOptions = {
	// TODO: Remove this override when the following issue is resolved: https://github.com/eslint-community/eslint-plugin-n/issues/42
	ecmaVersion: 'latest',
};

const browserParserOptions = {
	// TODO: Remove this override when the following issue is resolved: https://github.com/vuejs/eslint-plugin-vue/issues/1991
	ecmaVersion: 'latest',
};

/**
 * Based on: https://github.com/xojs/xo/blob/613011be50d0c8ea1b30df850557fd07552f285b/config/plugins.cjs
 */
const xoRules = {
	'@eslint-community/eslint-comments/disable-enable-pair': [
		'error',
		{
			allowWholeFile: true,
		},
	],
	'@eslint-community/eslint-comments/no-unlimited-disable': 'off',
	'@eslint-community/eslint-comments/no-unused-disable': 'error',
	'n/no-extraneous-import': 'off',
	'n/no-extraneous-require': 'off',
	'n/no-missing-import': 'off',
	'n/no-missing-require': 'off',
	'n/no-unpublished-import': 'off',
	'n/no-unpublished-require': 'off',
	'n/shebang': 'off',
	'unicorn/consistent-destructuring': 'off',
	'unicorn/consistent-function-scoping': 'off',
	'unicorn/no-useless-undefined': 'off',
	'unicorn/prefer-ternary': ['error', 'only-single-line'],
};

const myRules = {
	'class-methods-use-this': 'error',
	'func-name-matching': [
		'error',
		{
			considerPropertyDescriptor: true,
			includeCommonJSModuleExports: true,
		},
	],
	'import/order': [
		'error',
		{
			'newlines-between': 'never',
		},
	],
	'import/prefer-default-export': 'off',
	'unicorn/prevent-abbreviations': [
		'error',
		{
			replacements: {
				props: false,
				ref: false,
			},
		},
	],
};

const baseRules = {
	...xoRules,
	...myRules,
};

const jsRules = {
	...baseRules,
};

const tsRules = {
	...baseRules,

	// Required to override `plugin:import/recommended`. See: https://github.com/xojs/eslint-config-xo-typescript/blob/4fd54c28e77a80d381762f73a8be1ad52f866b48/index.js#L702
	'import/namespace': 'off',
};

const browserDirectories = ['assets/scripts', 'modules'];

const nodeConfigOverride = {
	files: '*.{js,mjs,cjs,jsx}',
	excludedFiles: browserDirectories.map((item) => join(item, '**')),
	extends: ['xo', ...commonPluginConfigs, ...nodePluginConfigs],
	parserOptions: {
		...nodeParserOptions,
	},
	plugins: ['es-x'],
	rules: {
		...jsRules,
	},
};

const nodeTsConfigOverride = {
	files: '*.{ts,mts,cts,tsx}',
	excludedFiles: browserDirectories.map((item) => join(item, '**')),
	extends: [
		'xo',
		'xo-typescript',
		...commonPluginConfigs,
		...tsPluginConfigs,
		...nodePluginConfigs,
	],
	parserOptions: {
		...nodeParserOptions,
	},
	plugins: ['es-x'],
	rules: {
		...tsRules,
	},
	settings: {
		'es-x': {
			aggressive: true,
		},
		'import/resolver': {
			node: true,
			typescript: true,
		},
	},
};

const testConfigOverride = {
	files: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
	extends: ['xo', ...commonPluginConfigs, ...testPluginConfigs],
	rules: {
		...jsRules,
	},
};

const testTsConfigOverride = {
	files: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
	extends: [
		'xo',
		'xo-typescript',
		...commonPluginConfigs,
		...tsPluginConfigs,
		...testPluginConfigs,
	],
	rules: {
		...tsRules,
	},
	settings: {
		'es-x': {
			aggressive: true,
		},
		'import/resolver': {
			node: true,
			typescript: true,
		},
	},
};

const browserConfigOverride = {
	files: browserDirectories.map((item) => join(item, '**/*.{js,mjs,cjs,jsx}')),
	extends: ['xo/browser', ...commonPluginConfigs, ...browserPluginConfigs],
	parserOptions: {
		...browserParserOptions,
	},
	plugins: ['es-x'],
	rules: {
		...jsRules,
	},
	settings: {
		'import/resolver': {
			webpack: true,
		},
	},
};

const browserTsConfigOverride = {
	files: browserDirectories.map((item) => join(item, '**/*.{ts,mts,cts,tsx}')),
	extends: [
		'xo/browser',
		'xo-typescript',
		...commonPluginConfigs,
		...tsPluginConfigs,
		...browserPluginConfigs,
	],
	parserOptions: {
		...browserParserOptions,
		parser: {
			ts: '@typescript-eslint/parser',
		},
	},
	plugins: ['es-x'],
	rules: {
		...tsRules,
	},
	settings: {
		'es-x': {
			aggressive: true,
		},
		'import/resolver': {
			typescript: true,
			webpack: true,
		},
	},
};

const scriptConfigOverride = {
	files: '*.{cjs,cts}',
	rules: {
		strict: 'error',
	},
	parserOptions: {
		// TODO: Remove this override when switching to flat config format.
		sourceType: 'script',
	},
};

module.exports = defineConfig({
	root: true,
	ignorePatterns: [
		// Dotfiles
		'!.*.js',
		'!.*.mjs',
		'!.*.cjs',

		// Build output
		'/dist/',

		// Dependencies
		'/node_modules/',
	],
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},
	overrides: [
		nodeConfigOverride,
		nodeTsConfigOverride,
		testConfigOverride,
		testTsConfigOverride,
		browserConfigOverride,
		browserTsConfigOverride,
		scriptConfigOverride,
	],
});
