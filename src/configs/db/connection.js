const mongoose = require('mongoose');
const chalk = require('chalk');

const { MONGO_DB } = require('..');

const termination = chalk.bold.magenta,
	disconnected = chalk.bold.red,
	connected = chalk.bold.cyan,
	error = chalk.bold.yellow;

const getConnection = function () {
	return new Promise(async function (resolve, reject) {
		try {
			mongoose.Promise = global.Promise;

			await mongoose.connect(`mongodb://${MONGO_DB.HOST}:${MONGO_DB.PORT}/?authSource=admin`, MONGO_DB.MONGO_CONFIG);

			const db = mongoose.connection;
			resolve(db);
		} catch (error) {
			reject(error);
		}
	});
};

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log(termination('Mongoose default connection is disconnected due to application termination.'));
		process.exit(0);
	});
});

mongoose.connection.on('error', (err) => {
	console.log(error('Mongoose default connection has closed ' + err + ' error.'));
});

mongoose.connection.on('disconnected', () => {
	console.log(disconnected('Mongoose default connection is disconnected.'));
});

mongoose.connection.on('connected', () => {
	console.log(connected('Mongoose default connection is open.'));
});

module.exports = { getConnection };
