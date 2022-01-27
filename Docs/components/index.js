const securitySchemas = require('./security-schemas');
const responses = require('./responses');
const examples = require('./examples');
const schemas = require('./schemas');

module.exports = {
	components: {
		...securitySchemas,
		...responses,
		...examples,
		...schemas,
	},
};
