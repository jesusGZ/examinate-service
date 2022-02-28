module.exports = {
	schemas: {
		registerUser: {
			type: 'object',
			properties: {
				name: { type: 'string', example: 'Jesus Antonio Garcia Zurita', description: 'The username to register' },
				email: { type: 'string', example: 'example@gmail.com', description: 'The email of the user to register' },
				password: { type: 'string', example: 'secret', description: 'The password of the user to register' },
				user: { type: 'string', example: 'exampleUser', description: 'The nickname of the user to register' },
			},
		},
		updateUser: {
			type: 'object',
			properties: {
				name: { type: 'string', example: 'Jesus Antonio Garcia Zurita', description: 'The username to register' },
				email: { type: 'string', example: 'example@gmail.com', description: 'The email of the user to register' },
				password: { type: 'string', example: 'secret', description: 'The password of the user to register' },
				user: { type: 'string', example: 'exampleUser', description: 'The nickname of the user to register' },
				active: { type: 'boolean', example: 'true', description: 'The state of the user' },
			},
		},
		loginUser: {
			type: 'object',
			properties: {
				user: { type: 'string', example: 'exampleUser', description: 'The nickname of the user to register' },
				password: { type: 'string', example: 'secret', description: 'The password of the user to register' },
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
							options: [{ value: 'option 1' }, { value: 'option 2' }, { value: 'option 3' }, { value: 'option 4' }],
							correctOptionValue: 'option 3',
						},
						{
							marks: '2',
							value: 'example of a question 2',
							options: [{ value: 'option 1' }, { value: 'option 2' }, { value: 'option 3' }, { value: 'option 4' }],
							correctOptionValue: 'option 4',
						},
					],
				},
			},
		},
		deleteQuestionBank: {
			type: 'object',
			properties: { questionBankId: { type: 'string', example: '61f9a4a571920887e8693b20' } },
		},
		registerClass: {
			type: 'object',
			properties: { className: { type: 'string', example: 'TestClass4' } },
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
			properties: { classId: { type: 'string', example: '61fbe2e9466e9779ee9d0ac5' } },
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
		deleteExam: {
			type: 'object',
			properties: { examId: { type: 'string', example: '61fe8a4ec983293277399828' } },
		},
		getExamLive: {
			type: 'object',
			properties: {
				examinerId: { type: 'string', example: '61fae59d4864d9e8fcd134ac' },
				examId: { type: 'string', example: '61fe8a16c9832932773997d6' },
				candidateId: { type: 'string', example: '61fe8a16c9832932773997d7' },
				candidatePassword: { type: 'string', example: 'dqdvp9cs' },
			},
		},
	},
};
