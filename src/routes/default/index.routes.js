const response = require('../../helpers/serviceResponse');

module.exports = (router) => {
	router.post('*', (req, res) => {
		response.badRequest(res, 'Ruta no definida');
	});

	router.get('*', (req, res) => {
		response.badRequest(res, 'Ruta no definida');
	});

	router.put('*', (req, res) => {
		response.badRequest(res, 'Ruta no definida');
	});

	router.delete('*', (req, res) => {
		response.badRequest(res, 'Ruta no definida');
	});
};
