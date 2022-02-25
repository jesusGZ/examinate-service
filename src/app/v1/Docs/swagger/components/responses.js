module.exports = {
	responses: {
		400: {
			description: 'Error de usuario, este se define según sera el caso',
			content: {
				'application/json': {
					schema: { example: { success: false, message: 'Parámetros incorrectos', result: null } },
				},
			},
		},
		401: {
			description: 'Error de autenticación',
			content: {
				'application/json': {
					schema: { example: { success: false, message: 'No autorizado', result: null } },
				},
			},
		},
		500: {
			description: 'Error de servidor',
			content: {
				'application/json': {
					schema: { example: { success: false, message: 'Error interno del servidor', result: null } },
				},
			},
		},
	},
};
