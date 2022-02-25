module.exports = {
	'/examlive': {
		get: {
			tags: ['examlive'],
			summary: 'Obtener informacion de examen en vivo',
			description: 'Se obtiene la informacion del examen a realizar.',
			operationId: 'getExamLive',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/getExamLive',
						},
						examples: {
							User: {
								$ref: '#/components/examples/getExamLive',
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
									questionBank: {
										questionBankName: 'Test',
										questions: [
											{
												marks: 1,
												value: 'example of a question 1',
												options: [
													{
														value: 'option 1',
														_id: '61fae5e45ef20bf29ba2ea72',
													},
													{
														value: 'option 2',
														_id: '61fae5e45ef20bf29ba2ea73',
													},
													{
														value: 'option 3',
														_id: '61fae5e45ef20bf29ba2ea74',
													},
													{
														value: 'option 4',
														_id: '61fae5e45ef20bf29ba2ea75',
													},
												],
												correctOptionValue: 'option 3',
												_id: '61fae5e45ef20bf29ba2ea71',
											},
											{
												marks: 2,
												value: 'example of a question 2',
												options: [
													{
														value: 'option 1',
														_id: '61fae5e45ef20bf29ba2ea77',
													},
													{
														value: 'option 2',
														_id: '61fae5e45ef20bf29ba2ea78',
													},
													{
														value: 'option 3',
														_id: '61fae5e45ef20bf29ba2ea79',
													},
													{
														value: 'option 4',
														_id: '61fae5e45ef20bf29ba2ea7a',
													},
												],
												correctOptionValue: 'option 4',
												_id: '61fae5e45ef20bf29ba2ea76',
											},
										],
										_id: '61fae5b65ef20bf29ba2e9e9',
									},
									startDateTime: '2022-02-05T06:00:00.000Z',
									endDateTime: '2022-02-06T06:00:00.000Z',
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
		},
	},
	'/examlive/result': {},
};
