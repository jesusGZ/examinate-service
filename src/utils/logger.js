const { createLogger, format, transports } = require('winston');
require('winston-mongodb');

const { MONGO_DB } = require('../core/config');

const url = `mongodb://${MONGO_DB.MONGO_USER}:${MONGO_DB.MONGO_PASS}@${MONGO_DB.MONGO_HOST}:${MONGO_DB.MONGO_PORT}/${MONGO_DB.MONGO_DB_LOGS}?authSource=admin`;

const date = new Date(),
	month = date.getMonth() + 1,
	name = `${date.getFullYear()}-${month}-${date.getDate()}`;

const loggerConfig = {
	transports: [
		new transports.File({
			filename: `logs/server-${name}.log`,
			format: format.combine(
				format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
				format.align(),
				format.splat(),
				format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}: ${info.meta ? JSON.stringify(info.meta) : ''}`)
			),
		}),

		new transports.MongoDB({
			db: url,
			options: { useUnifiedTopology: true },
			collection: 'examinete_service_logs',
			metaKey: 'meta',
			format: format.combine(format.timestamp(), format.json()),
		}),
	],
};

async function errorLogger(message, dataLog) {
	try {
		await createLogger(loggerConfig).error(message, { meta: dataLog });
		console.log('Log generado');
	} catch (error) {
		console.log('Log ddd');
	}
}

module.exports = {
	errorLogger,
};
