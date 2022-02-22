const response = require('../serviceResponse');
module.exports = function errors(err, res) {
	let error;

	if (!err) {
		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) error = res.status(400).json({ status: 'error', data: '', message: 'Error de poeticion' });
		else error = res.status(500).json(response(false, 'error interno del servidor', null));
	} else {
		error = err;
	}

	res.status(400).json(response(false, error, null));
};
