const getErrorMessagesOfJoi = require('../../utils/ErrorMessagesOfJoi');
const response = require('../serviceResponse');

module.exports = function setValidateRequestMiddleware(schema, property) {
	return (req, res, next) => {
		const { error, value } = schema.validate(req[property], { allowUnknown: property === 'headers' ? true : false, convert: true });

		if (error) {
			const { details } = error;
			const message = getErrorMessagesOfJoi(details);
			return response.badRequest(res, message);
		}

		req[property] = value;
		next();
	};
};
