#!/usr/bin/env node

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');
const chalk = require('chalk');

program.version('0.0.1').argument('[filename]', 'Name of the file to execute').action(async ({ filename }) => {
	const name = filename || 'index.js';

	try {
		await fs.promises.access(name);
	} catch (error) {
		throw new Error(`could not find the file ${name}`);
	}

	let proc;
	const start = debounce(() => {
		if (proc) {
			proc.kill();
		}
		console.log(chalk.blue('>>>> Starting Process...'));
		proc = spawn('node', [ name ], { stdio: 'inherit' });
	}, 100);

	chokidar
		.watch('.', {
			ignored: /(\.git)|(node_modules)/
		})
		.on('add', start)
		.on('change', start)
		.on('unlink', start);
});

program.parse(process.argv);
