module.exports = {
	'/questionBank': {
		post: {
			tags: ['questionBank'],
			summary: 'Registrar banco de preguntas',
			description: 'Registrar el nombre de un banco de preguntas',
			operationId: 'registerQuestionBank',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/registerQuestionBank',
						},
						examples: {
							User: {
								$ref: '#/components/examples/registerQuestionBank',
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
										questionBankName: 'Test',
										_id: '61f944ac21ad261a6c616146',
										questions: [],
									},
									{
										questionBankName: 'Test2',
										_id: '61f9a2d01253a9f603f56a6e',
										questions: [],
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
			tags: ['questionBank'],
			summary: 'Listar los bancos de preguntas',
			description: 'Muestra un listado de los bancos de preguntas pertenecientes al usuario logueado',
			operationId: 'registerQuestionBank',
			responses: {
				200: {
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								status: 'success',
								data: [
									{
										questionBankName: 'Test',
										_id: '61f944ac21ad261a6c616146',
										questions: [],
									},
									{
										questionBankName: 'Test2',
										questions: [
											{
												marks: 1,
												value: 'Example of a question 1',
												options: [
													{
														value: 'option 1',
														_id: '61f980f9e95fe376e55fb40d',
													},
													{
														value: 'option 2',
														_id: '61f980f9e95fe376e55fb40e',
													},
													{
														value: 'option 3',
														_id: '61f980f9e95fe376e55fb40f',
													},
													{
														value: 'option 4',
														_id: '61f980f9e95fe376e55fb410',
													},
												],
												correctOptionValue: 'option 3',
												_id: '61f980f9e95fe376e55fb40c',
											},
											{
												marks: 2,
												value: 'Example of a question 2',
												options: [
													{
														value: 'option 1',
														_id: '61f980f9e95fe376e55fb412',
													},
													{
														value: 'option 2',
														_id: '61f980f9e95fe376e55fb413',
													},
													{
														value: 'option 3',
														_id: '61f980f9e95fe376e55fb414',
													},
													{
														value: 'option 4',
														_id: '61f980f9e95fe376e55fb415',
													},
												],
												correctOptionValue: 'option 2',
												_id: '61f980f9e95fe376e55fb411',
											},
										],
										_id: '61f9453121ad261a6c61614b',
									},
									{
										questionBankName: 'Test3',
										_id: '61f9a2d01253a9f603f56a6e',
										questions: [],
									},
									{
										questionBankName: 'Test4',
										_id: '61f9a4a571920887e8693b20',
										questions: [],
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
