module.exports = {
	'/questionBank': {
		post: {
			tags: ['questionBank'],
			summary: 'Register Question Bank',
			description: 'Register the name of a question bank',
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
					description: 'Request made successfully',
					content: {
						'application/json': {
							example: {
								success: true,
								message: 'Request made successfully.',
								result: [
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
			summary: 'List question banks',
			description: 'Shows a list of question banks belonging to the logged in user',
			operationId: 'getQuestionBank',
			responses: {
				200: {
					description: 'Request made successfully',
					content: {
						'application/json': {
							example: {
								success: true,
								message: 'Request made successfully.',
								result: [
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
			tags: ['questionBank'],
			summary: 'Update question bank',
			description: 'Update a question bank using its id',
			operationId: 'updateQuestionBank',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/updateQuestionBank',
						},
						examples: {
							User: {
								$ref: '#/components/examples/updateQuestionBank',
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Request made successfully',
					content: {
						'application/json': {
							example: {
								success: true,
								message: 'Request made successfully.',
								result: {
									_id: '61f854214c90e061b2d3c927',
									name: 'Antonio Romero Zurita',
									email: 'tony@gmail.com',
									user: 'tony',
									active: true,
									questionBanks: [
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
													value: 'example of a question 1',
													options: [
														{
															value: 'option 1',
															_id: '61f9a998272e7aa8053e81ad',
														},
														{
															value: 'option 2',
															_id: '61f9a998272e7aa8053e81ae',
														},
														{
															value: 'option 3',
															_id: '61f9a998272e7aa8053e81af',
														},
														{
															value: 'option 4',
															_id: '61f9a998272e7aa8053e81b0',
														},
													],
													correctOptionValue: 'option 3',
													_id: '61f9a998272e7aa8053e81ac',
												},
												{
													marks: 2,
													value: 'example of a question 2',
													options: [
														{
															value: 'option 1',
															_id: '61f9a998272e7aa8053e81b2',
														},
														{
															value: 'option 2',
															_id: '61f9a998272e7aa8053e81b3',
														},
														{
															value: 'option 3',
															_id: '61f9a998272e7aa8053e81b4',
														},
														{
															value: 'option 4',
															_id: '61f9a998272e7aa8053e81b5',
														},
													],
													correctOptionValue: 'option 4',
													_id: '61f9a998272e7aa8053e81b1',
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
		delete: {
			tags: ['questionBank'],
			summary: 'Delete a question bank',
			description: 'Allows you to delete a bank of questions belonging to the logged in user',
			operationId: 'deleteQuestionBank',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/deleteQuestionBank',
						},
						examples: {
							User: {
								$ref: '#/components/examples/deleteQuestionBank',
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Request made successfully',
					content: {
						'application/json': {
							example: {
								success: true,
								message: 'Request made successfully.',
								result: [
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
};
