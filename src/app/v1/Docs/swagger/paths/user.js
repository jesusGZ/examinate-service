module.exports = {
	'/user': {
		post: {
			tags: ['user'],
			summary: 'Registrar usuario',
			description: 'Registrar usuarios nuevos',
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
								success: true,
								message: 'Petición realizada exitosamente.',
								result: {
									name: 'Jesus Antonio Garcia Zurita',
									email: 'example@gmail.com',
									user: 'example',
									active: true,
									_id: '61f98dce71eb4e51ca369d6b',
								},
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
		get: {
			tags: ['user'],
			summary: 'Consultar usuario por su id',
			description: 'Muesta los datos de un usuario',
			operationId: 'getUser',
			parameters: [
				{
					name: 'id',
					in: 'header',
					description: 'El usuario id con el que se registrara el usuario: 61f859d9a8d488e17116c4b1',
					required: true,
					schema: {
						type: 'string',
						example: '61f859d9a8d488e17116c4b1',
					},
				},
			],
			responses: {
				200: {
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								success: true,
								message: 'Petición realizada exitosamente.',
								result: {
									_id: '61f859d9a8d488e17116c4b1',
									name: 'Armando lopez lopez',
									email: 'test@gmail.com',
									user: 'test',
									active: true,
								},
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
		put: {
			tags: ['user'],
			summary: 'Actualizar usuario',
			description: 'Actualizar un usuario existente',
			operationId: 'updateUser',
			parameters: [
				{
					name: 'id',
					in: 'header',
					description: 'El usuario id con el que se registrara el usuario: 61f859d9a8d488e17116c4b1',
					required: true,
					schema: {
						type: 'string',
						example: '61f859d9a8d488e17116c4b1',
					},
				},
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/updateUser',
						},
						examples: {
							User: {
								$ref: '#/components/examples/updateUser',
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
								success: true,
								message: 'Petición realizada exitosamente.',
								result: null,
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

	'/users': {
		get: {
			tags: ['user'],
			summary: 'Listar los usuarios',
			description: 'Muesta un listado de los usuarios registrados.',
			operationId: 'getUsers',
			responses: {
				200: {
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								success: true,
								message: 'Petición realizada exitosamente.',
								result: [
									{
										_id: '61f854214c90e061b2d3c927',
										name: 'Antonio Romero Zurita',
										email: 'tony@gmail.com',
										user: 'tony',
									},
									{
										_id: '61f859d9a8d488e17116c4b1',
										name: 'Armando lopez lopez',
										email: 'test@gmail.com',
										user: 'test',
									},
									{
										_id: '61f999e93075b5e62ca011e6',
										name: 'Jesus Antonio Garcia Zurita',
										email: 'example@gmail.com',
										user: 'exampleUser',
									},
								],
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
	'/user/login': {
		post: {
			tags: ['user'],
			summary: 'Inicio de sesion',
			description: 'Inicio de sesion de un usuario del sistema.',
			operationId: 'loginUser',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/loginUser',
						},
						examples: {
							User: {
								$ref: '#/components/examples/loginUser',
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
								success: true,
								message: 'Petición realizada exitosamente.',
								result: {
									_id: '61f854214c90e061b2d3c927',
									name: 'Antonio Romero Zurita',
									email: 'tony@gmail.com',
									user: 'tony',
									active: true,
									access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjg1NDIxNGM5MGUwNjFiMmQzYzkyNyIsInVzZXIiOiJ0b255IiwiaWF0IjoxNjQzNzQ5NTIzLCJleHAiOjE2NDM3NTMxMjN9.Ij4pY_kSqBpsfrQ6SxV8UlDKBTGNPnpjA9Fk_yF5TkA',
								},
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
		},
	},
};
