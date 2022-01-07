function errors(err, req, res, next) {
	let error;

	if (!err) {
		if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
			error = res.status(400).json({ status: 'error', data: '', message: 'Petición mal formada, o JSON no valido' });
		} else {
			error = res.status(500).json({ status: 'error', data: '', message: 'error interno del servidor' });
		}
	} else {
		error = err;
	}

	res.status(400).json({ status: 'error', data: '', message: error });
}

module.exports = errors;
