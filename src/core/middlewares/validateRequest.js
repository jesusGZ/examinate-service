const getValidationErrorMessage = require('../../utils/responsesJoy');

const setValidateRequestMiddleware = (schema, property) => {
	return (req, res, next) => {
		const { error, value } = schema.validate(req[property], {
			allowUnknown: property === 'headers' ? true : false,
			convert: true,
		});

		if (error) {
			const { details } = error;
			const message = getValidationErrorMessage(details);
			return next(message);
		}

		req[property] = value;
		next();
	};
};

module.exports = setValidateRequestMiddleware;
