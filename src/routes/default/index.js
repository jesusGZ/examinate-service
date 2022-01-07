module.exports = (app) => {
  app.post('*', (request, response) => {
    response.status(404).json({ status: 'error', data: 'Ruta no definida' });
  });

  app.get('*', (request, response) => {
    response.status(404).json({ status: 'error', data: 'Ruta no definida' });
  });

  app.put('*', (request, response) => {
    response.status(404).json({ status: 'error', data: 'Ruta no definida' });
  });
};
