#!/usr/bin/env node
const fs = require('fs');
const util = require('util');

// METHOD #2
// const lstat = util.promisify(fs.lstat);

// METHOD #3
const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
	if (err) {
		console.log(err);
	}

	for (let filename of filenames) {
		try {
			const stats = await lstat(filename);

			console.log(filename, stats.isFile());
		} catch (error) {
			console.log(error);
		}
	}
});

// METHOD #1
// const lstat = (filename) => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(filename, (err, stats) => {
// 			if (err) {
// 				reject(err);
// 			}
// 			resolve(stats);
// 		});
// 	});
// };
