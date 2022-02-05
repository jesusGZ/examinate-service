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
	},
};
