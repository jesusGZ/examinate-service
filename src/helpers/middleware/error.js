const response = require('../serviceResponse');

module.exports = function errors(err, req, res, next) {
	let error;

	if (!err) {
		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) error = res.status(400).json({ status: 'error', data: '', message: 'Error de poeticion' });
		else error = response.serverError(res);
	} else {
		error = err;
	}

	response.error(res, error);
};
