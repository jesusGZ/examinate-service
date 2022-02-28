module.exports = {
	'/exam': {
		post: {
			tags: ['exams'],
			summary: 'Register exam',
			description: 'Register a new exam for your application.',
			operationId: 'registerExams',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/registerExams',
						},
						examples: {
							User: {
								$ref: '#/components/examples/registerExams',
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
										examName: 'testExam',
										startDateTime: '2022-01-05T06:00:00.000Z',
										endDateTime: '2022-01-05T06:00:00.000Z',
										totalMarks: 3,
										questionBankId: '61fae5b65ef20bf29ba2e9e9',
										candidates: [
											{
												candidateName: 'Antonio Zurita',
												candidatePassword: 'dqdvp9cs',
												hasAppeared: false,
												_id: '61fe8a16c9832932773997d7',
												responses: [],
											},
										],
										_id: '61fe8a16c9832932773997d6',
									},
									{
										examName: 'testExam2',
										startDateTime: '2022-01-05T06:00:00.000Z',
										endDateTime: '2022-01-05T06:00:00.000Z',
										totalMarks: 3,
										questionBankId: '61fae5b65ef20bf29ba2e9e9',
										candidates: [
											{
												candidateName: 'Antonio Zurita',
												candidatePassword: 'fvjiuzk7',
												hasAppeared: false,
												_id: '61fe8a4ec983293277399829',
												responses: [],
											},
										],
										_id: '61fe8a4ec983293277399828',
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
		delete: {
			tags: ['exams'],
			summary: 'Delete an exam',
			description: 'Allows you to delete an exam belonging to the logged in user',
			operationId: 'deleteExam',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/deleteExam',
						},
						examples: {
							User: {
								$ref: '#/components/examples/deleteExam',
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
									_id: '61fae59d4864d9e8fcd134ac',
									exams: [
										{
											examName: 'testExam',
											startDateTime: '2022-01-05T06:00:00.000Z',
											endDateTime: '2022-01-05T06:00:00.000Z',
											totalMarks: 3,
											questionBankId: '61fae5b65ef20bf29ba2e9e9',
											candidates: [
												{
													candidateName: 'Antonio Zurita',
													candidatePassword: 'dqdvp9cs',
													hasAppeared: false,
													_id: '61fe8a16c9832932773997d7',
													responses: [],
												},
											],
											_id: '61fe8a16c9832932773997d6',
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
	},
	'/info': {
		get: {
			tags: ['exams'],
			summary: 'General information',
			description: 'Shows the information belonging to the logged in user in a general way.',
			operationId: 'getInfo',
			responses: {
				200: {
					description: 'Request made successfully',
					content: {
						'application/json': {
							example: {
								success: true,
								message: 'Request made successfully.',
								result: {
									_id: '61fae59d4864d9e8fcd134ac',
									name: 'Antonio Romero Zurita',
									email: 'tony@gmail.com',
									user: 'tony',
									active: true,
									questionBanks: [
										{
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
										{
											questionBankName: 'Test2',
											_id: '61fae5bc5ef20bf29ba2e9f2',
											questions: [],
										},
										{
											questionBankName: 'Test3',
											_id: '61fae5c35ef20bf29ba2e9fa',
											questions: [],
										},
									],
									classes: [
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
									exams: [
										{
											examName: 'testExam',
											startDateTime: '2022-01-05T06:00:00.000Z',
											endDateTime: '2022-01-05T06:00:00.000Z',
											totalMarks: 3,
											questionBankId: '61fae5b65ef20bf29ba2e9e9',
											candidates: [
												{
													candidateName: 'Antonio Zurita',
													candidatePassword: 'dqdvp9cs',
													hasAppeared: false,
													_id: '61fe8a16c9832932773997d7',
													responses: [],
												},
											],
											_id: '61fe8a16c9832932773997d6',
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
	},
	'/exams': {
		get: {
			tags: ['exams'],
			summary: 'List the exams',
			description: 'Shows a list of exams belonging to the logged in user',
			operationId: 'getExams',
			responses: {
				200: {
					description: 'Request made successfully',
					content: {
						'application/json': {
							example: {
								success: true,
								message: 'Request made successfully.',
								result: {
									_id: '61fae59d4864d9e8fcd134ac',
									exams: [
										{
											examName: 'testExam',
											startDateTime: '2022-01-05T06:00:00.000Z',
											endDateTime: '2022-01-05T06:00:00.000Z',
											totalMarks: 3,
											questionBankId: '61fae5b65ef20bf29ba2e9e9',
											candidates: [
												{
													candidateName: 'Antonio Zurita',
													candidatePassword: 'dqdvp9cs',
													hasAppeared: false,
													_id: '61fe8a16c9832932773997d7',
													responses: [],
												},
											],
											_id: '61fe8a16c9832932773997d6',
										},
										{
											examName: 'testExam2',
											startDateTime: '2022-01-05T06:00:00.000Z',
											endDateTime: '2022-01-05T06:00:00.000Z',
											totalMarks: 3,
											questionBankId: '61fae5b65ef20bf29ba2e9e9',
											candidates: [
												{
													candidateName: 'Antonio Zurita',
													candidatePassword: '3ebpg0py',
													hasAppeared: false,
													_id: '61fe940cb63c32bf62f644c3',
													responses: [],
												},
											],
											_id: '61fe940cb63c32bf62f644c2',
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
	},
};
