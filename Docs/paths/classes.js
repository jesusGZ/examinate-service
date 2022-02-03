module.exports = {
	'/class': {
		post: {
			tags: ['classes'],
			summary: 'Registrar una nueva clase',
			description: 'Registrar el nombre de una clase',
			operationId: 'registerClass',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/registerClass',
						},
						examples: {
							classes: {
								$ref: '#/components/examples/registerClass',
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
								data: [
									{
										className: 'TestClass',
										_id: '61fae6045ef20bf29ba2ea99',
										candidates: [],
									},
									{
										className: 'TestClass2',
										_id: '61fae6075ef20bf29ba2eaac',
										candidates: [],
									},
									{
										className: 'TestClass3',
										_id: '61fae6095ef20bf29ba2eac1',
										candidates: [],
									},
									{
										className: 'TestClass4',
										_id: '61fbe2e9466e9779ee9d0ac5',
										candidates: [],
									},
								],
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
		get: {
			tags: ['classes'],
			summary: 'Listar las clases',
			description: 'Muestra un listado de las clases pertenecientes al usuario logueado',
			operationId: 'getClass',
			responses: {
				200: {
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								status: 'success',
								data: [
									{
										className: 'TestClass',
										_id: '61fae6045ef20bf29ba2ea99',
										candidates: [],
									},
									{
										className: 'TestClass2',
										_id: '61fae6075ef20bf29ba2eaac',
										candidates: [],
									},
									{
										className: 'TestClass3',
										_id: '61fae6095ef20bf29ba2eac1',
										candidates: [],
									},
									{
										className: 'TestClass4',
										_id: '61fbe2e9466e9779ee9d0ac5',
										candidates: [],
									},
								],
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
