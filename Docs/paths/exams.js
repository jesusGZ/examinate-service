module.exports = {
	'/exam': {
		post: {
			tags: ['exams'],
			summary: 'Registrar examen',
			description: 'Registrar un nuevo examen para su aplicación.',
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
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								status: 'success',
								data: [
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
			tags: ['exams'],
			summary: 'Eliminar un examen',
			description: 'Permite eliminar un examen perteneciente al usuario logueado',
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
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								status: 'success',
								data: {
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
	'/info': {
		get: {
			tags: ['exams'],
			summary: 'Información general',
			description: 'Muestra la informacion pertenecientes al usuario logueado de forma general',
			operationId: 'getInfo',
			responses: {
				200: {
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								status: 'success',
								data: {
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
	'/exam': {
		get: {
			tags: ['exams'],
			summary: 'Listar los examenes',
			description: 'Muestra un listado de los examenes pertenecientes al usuario logueado',
			operationId: 'getExams',
			responses: {
				200: {
					description: 'Petición realizada  exitosamente',
					content: {
						'application/json': {
							example: {
								status: 'success',
								data: {
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
