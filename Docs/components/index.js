const securitySchemas = require('./security-schemas'),
	responses = require('./responses'),
	examples = require('./examples'),
	schemas = require('./schemas');

module.exports = { components: { ...securitySchemas, ...responses, ...examples, ...schemas } };
