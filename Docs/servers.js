const { SERVICE } = require('../src/core/config');

module.exports = {
	servers: [
		{
			url: `http://localhost.com:${SERVICE.LOCAL_PORT}/`,
			description: 'Dev server',
		},
	],
};
