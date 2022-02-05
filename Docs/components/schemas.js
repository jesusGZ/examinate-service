module.exports = {
	schemas: {
		registerUser: {
			type: 'object',
			properties: {
				name: { type: 'string', example: 'Jesus Antonio Garcia Zurita', description: 'El nombre del usuario a registrar' },
				email: { type: 'string', example: 'example@gmail.com', description: 'El email del usuario a registrar' },
				user: { type: 'string', example: 'exampleUser', description: 'El nick del usuario a registrar' },
				password: { type: 'string', example: 'secret', description: 'La contraseña del usuario a registrar' },
			},
		},
		updateUser: {
			type: 'object',
			properties: {
				name: { type: 'string', example: 'Jesus Antonio Garcia Zurita', description: 'El nombre del usuario a registrar' },
				email: { type: 'string', example: 'example@gmail.com', description: 'El email del usuario a registrar' },
				user: { type: 'string', example: 'exampleUser', description: 'El nick del usuario a registrar' },
				password: { type: 'string', example: 'secret', description: 'La contraseña del usuario a registrar' },
				active: { type: 'boolean', example: 'true', description: 'El estado del usuario' },
			},
		},
		loginUser: {
			type: 'object',
			properties: {
				user: { type: 'string', example: 'exampleUser', description: 'El nick del usuario a registrar' },
				password: { type: 'string', example: 'secret', description: 'La contraseña del usuario a registrar' },
			},
		},
		registerQuestionBank: {
			type: 'object',
			properties: {
				questionBankName: { type: 'string', example: 'Test3' },
			},
		},
		updateQuestionBank: {
			type: 'object',
			properties: {
				id: { type: 'string', example: '61f9453121ad261a6c61614b' },
				questionBankName: { type: 'string', example: 'Test2' },
				questions: {
					type: 'object',
					example: [
						{
							marks: '1',
							value: 'example of a question 1',
							options: [
								{
									value: 'option 1',
								},
								{
									value: 'option 2',
								},
								{
									value: 'option 3',
								},
								{
									value: 'option 4',
								},
							],
							correctOptionValue: 'option 3',
						},
						{
							marks: '2',
							value: 'example of a question 2',
							options: [
								{
									value: 'option 1',
								},
								{
									value: 'option 2',
								},
								{
									value: 'option 3',
								},
								{
									value: 'option 4',
								},
							],
							correctOptionValue: 'option 4',
						},
					],
				},
			},
		},
		deleteQuestionBank: {
			type: 'object',
			properties: {
				questionBankId: { type: 'string', example: '61f9a4a571920887e8693b20' },
			},
		},
		registerClass: {
			type: 'object',
			properties: {
				className: { type: 'string', example: 'TestClass4' },
			},
		},
		updateClass: {
			type: 'object',
			properties: {
				id: { type: 'string', example: '61fae6045ef20bf29ba2ea99' },
				className: { type: 'string', example: 'TestClass' },
				candidates: [
					{
						candidateName: { type: 'string', example: 'Antonio Zurita' },
						candidateEmail: { type: 'string', example: 'candidate@gmail.com' },
					},
				],
			},
		},
		deleteClasses: {
			type: 'object',
			properties: {
				classId: { type: 'string', example: '61fbe2e9466e9779ee9d0ac5' },
			},
		},
		registerExams: {
			type: 'object',
			properties: {
				examName: { type: 'string', example: 'testExam2' },
				startDateTime: { type: 'date', example: '2022-01-05' },
				endDateTime: { type: 'date', example: '2022-01-06' },
				questionBankId: { type: 'string', example: '61fae5b65ef20bf29ba2e9e9' },
				classId: { type: 'string', example: '61fae6045ef20bf29ba2ea99' },
			},
		},
	},
};
