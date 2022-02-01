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
	},
};
