/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import glob from 'rollup-plugin-glob';
import asciidoc from 'rollup-plugin-asciidoc';
import sveltePreprocess from "svelte-preprocess";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = Boolean(process.env.SAPPER_LEGACY_BUILD);

const { defaults } = require("./svelte.config.js");

const preprocess = [
	sveltePreprocess({ defaults }),
	// You could have more preprocessors, like MDsveX
];

const sourcemap = dev ? "inline" : false;

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

export default {
	client: {
		input: config.client.input().replace(/\.js$/, ".ts"),
		output: { ...config.client.output(), sourcemap },
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				preprocess,
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs({
				sourceMap: !!sourcemap,
			}),
			typescript({
				noEmitOnError: !dev,
				sourceMap: !!sourcemap,
			}),
			json(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			}),
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: { server: config.server.input().server.replace(/\.js$/, ".ts") },
		output: { ...config.server.output(), sourcemap },
		plugins: [
			replace({
				"process.browser": false,
				"process.env.NODE_ENV": JSON.stringify(mode),
				"module.require": "require",
			}),
			svelte({
				generate: "ssr",
				dev,
				preprocess,
			}),
			resolve({
				dedupe: ["svelte"],
			}),
			commonjs({
				sourceMap: !!sourcemap,
			}),
			typescript({
				noEmitOnError: !dev,
				sourceMap: !!sourcemap,
			}),
			json(),
			glob(),
			asciidoc(),
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),
		preserveEntrySignatures: 'strict',
		onwarn,
	},
	
	serviceworker: {
		input: config.serviceworker.input().replace(/\.js$/, ".ts"),
		output: { ...config.serviceworker.output(), sourcemap },
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs({
				sourceMap: !!sourcemap,
			}),
			typescript({
				noEmitOnError: !dev,
				sourceMap: !!sourcemap,
			}),
			!dev && terser()
		],
		onwarn,
		preserveEntrySignatures: false
	}
};
