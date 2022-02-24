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

			await mongoose.connect(`mongodb://${MONGO_DB.MONGO_HOST}:${MONGO_DB.MONGO_PORT}/?authSource=admin`, {
				//serverSelectionTimeoutMS: 5000,
				user: `${MONGO_DB.MONGO_USER}`,
				pass: `${MONGO_DB.MONGO_PASS}`,
				useUnifiedTopology: true,
				useNewUrlParser: true,
				autoIndex: true,
			});

			const db = mongoose.connection;
			resolve(db);
		} catch (error) {
			reject(error);
		}
	});
};

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log(termination('La conexión predeterminada de Mongoose está desconectada debido a la finalización de la aplicación.'));
		process.exit(0);
	});
});

mongoose.connection.on('error', (err) => {
	console.log(error('La conexión predeterminada de Mongoose ha pasado ' + err + ' error'));
});

mongoose.connection.on('disconnected', () => {
	console.log(disconnected('La conexión predeterminada de Mongoose está desconectada.'));
});

mongoose.connection.on('connected', () => {
	console.log(connected('La conexión predeterminada de Mongoose está abierta'));
});

module.exports = { getConnection };
