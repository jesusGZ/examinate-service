const { createLogger, format, transports } = require('winston');

const date = new Date();
const month = date.getMonth() + 1;
const name = `${date.getFullYear()}-${month}-${date.getDay()}`;

module.exports = createLogger({
	transports: new transports.File({
		filename: `logs/server-${name}.log`,
		format: format.combine(
			format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
			format.align(),
			format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
		),
	}),
});
