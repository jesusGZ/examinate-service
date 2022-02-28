const response = require('../helpers/serviceResponse');

module.exports = (router) => {
	router.post('*', (req, res) => {
		response.badRequest(res, 'undefined route');
	});

	router.get('*', (req, res) => {
		response.badRequest(res, 'undefined route');
	});

	router.put('*', (req, res) => {
		response.badRequest(res, 'undefined route');
	});

	router.delete('*', (req, res) => {
		response.badRequest(res, 'undefined route');
	});
};
