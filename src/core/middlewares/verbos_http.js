const VERBOS = ['GET', 'POST', 'PUT', 'OPTIONS'];

module.exports = function verbosHttp(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', `Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method`);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('access-control-expose-headers', 'token');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	if (req.method) {
		let methodValido = undefined;
		methodValido = VERBOS.find((metodo) => metodo == req.method);

		if (methodValido == undefined) {
			const error = {
				response: { status: 'error', data: 'Metodo de peticion no valido' },
				status: 405,
			};
			res.send(error);
		} else {
			next();
		}
	}
};
