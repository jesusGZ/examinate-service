module.exports = {
	'/user': {
		post: {
			tags: ['user'],
			summary: 'Registrar usuario',
			description: 'Registrar usuarios nuyevos',
			operationId: 'registerUser',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/registerUser',
						},
						examples: {
							User: {
								$ref: '#/components/examples/registerUser',
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								status: 'success',
								data: {
									name: 'Jesus Antonio Garcia Zurita',
									email: 'example@gmail.com',
									user: 'example',
									active: true,
									_id: '61f98dce71eb4e51ca369d6b',
								},
								message: 'Petición realizada exitosamente.',
							},
						},
					},
				},
				400: {
					$ref: '#/components/responses/400',
				},
				401: {
					$ref: '#/components/responses/401',
				},
				500: {
					$ref: '#/components/responses/500',
				},
			},
			security: [
				{
					token: [],
				},
			],
		},
	},
};
