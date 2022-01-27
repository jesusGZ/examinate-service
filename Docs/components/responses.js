module.exports = {
	responses: {
		400: {
			description: 'Error de usuario, este se define según sera el caso',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						example: {
							status: 'error',
							data: 'S/R',
							message: 'Parámetros incorrectos',
						},
					},
				},
			},
		},
		401: {
			description: 'Error de autenticación',
			content: {
				'application/json': {
					schema: {
						example: {
							status: 'error',
							data: 'No Autorizado',
							message: 'Este usuario no esta autorizado',
						},
					},
				},
			},
		},
		500: {
			description: 'Error de servidor',
			content: {
				'application/json': {
					schema: {
						example: {
							status: 'error',
							data: 'S/R',
							message: 'Error interno del servidor',
						},
					},
				},
			},
		},
	},
};
