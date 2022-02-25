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
								success: true,
								result: [
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
								success: true,
								result: [
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
		put: {
			tags: ['classes'],
			summary: 'Actualizar clases',
			description: 'Actualizar una clase mediante su id',
			operationId: 'updateClass',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/updateClass',
						},
						examples: {
							User: {
								$ref: '#/components/examples/updateClass',
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
								result: {
									_id: '61fae59d4864d9e8fcd134ac',
									classes: [
										{
											className: 'TestClass',
											candidates: [
												{
													candidateName: 'Antonio Zurita',
													candidateEmail: 'candidate@gmail.com',
													_id: '61fbff188d4a924250b51954',
												},
											],
											_id: '61fae6045ef20bf29ba2ea99',
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
									],
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
		delete: {
			tags: ['classes'],
			summary: 'Eliminar una clase',
			description: 'Permite eliminar una clase perteneciente al usuario logueado',
			operationId: 'deleteClasses',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/deleteClasses',
						},
						examples: {
							User: {
								$ref: '#/components/examples/deleteClasses',
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
								result: [
									{
										className: 'TestClass',
										candidates: [
											{
												candidateName: 'Antonio Zurita',
												candidateEmail: 'candidate@gmail.com',
												_id: '61fc00713077b96d0e21a6df',
											},
										],
										_id: '61fae6045ef20bf29ba2ea99',
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
