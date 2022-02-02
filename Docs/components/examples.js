module.exports = {
	examples: {
		registerUser: {
			summary: 'User',
			value: { name: 'Jesus Antonio Garcia Zurita', email: 'example@gmail.com', user: 'exampleUser', password: 'secret' },
		},
		updateUser: {
			summary: 'User',
			value: { name: 'Jesus Antonio Garcia Zurita', email: 'example@gmail.com', user: 'exampleUser', password: 'secret', active: 'true' },
		},
		loginUser: {
			summary: 'User',
			value: { user: 'exampleUser', password: 'secret' },
		},
		registerQuestionBank: {
			summary: 'questionBank',
			value: { questionBankName: 'Test3' },
		},
		updateQuestionBank: {
			summary: 'questionBank',
			value: {
				id: '61f9453121ad261a6c61614b',
				questionBankName: 'Test2',
				questions: [
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
	deleteQuestionBank: { summary: 'questionBank', value: { questionBankId: '61f9a4a571920887e8693b20' } },
};
