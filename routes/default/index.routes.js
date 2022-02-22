module.exports = (router) => {
	router.post('*', (request, response) => {
		response.status(404).json({ status: 'error', data: '', message: 'Ruta no definida' });
	});

	router.get('*', (request, response) => {
		response.status(404).json({ status: 'error', data: '', message: 'Ruta no definida' });
	});

	router.put('*', (request, response) => {
		response.status(404).json({ status: 'error', data: '', message: 'Ruta no definida' });
	});

	router.delete('*', (request, response) => {
		response.status(404).json({ status: 'error', data: '', message: 'Ruta no definida' });
	});
};
