module.exports = {
	'/class': {
		post: {
			tags: ['classes'],
			summary: 'Register a new class',
			description: 'Register the name of a class',
			operationId: 'registerClass',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/registerClass',
						},
						examples: {
							classes: {
								$ref: '#/components/examples/registerClass',
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
										className: 'TestClass',
										_id: '61fae6045ef20bf29ba2ea99',
										candidates: [],
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
									{
										className: 'TestClass4',
										_id: '61fbe2e9466e9779ee9d0ac5',
										candidates: [],
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
			tags: ['classes'],
			summary: 'list the classes',
			description: 'Shows a list of the classes belonging to the logged in user',
			operationId: 'getClass',
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
										className: 'TestClass',
										_id: '61fae6045ef20bf29ba2ea99',
										candidates: [],
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
									{
										className: 'TestClass4',
										_id: '61fbe2e9466e9779ee9d0ac5',
										candidates: [],
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
			tags: ['classes'],
			summary: 'update classes',
			description: 'Update a class by its id',
			operationId: 'updateClass',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/updateClass',
						},
						examples: {
							User: {
								$ref: '#/components/examples/updateClass',
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
									classes: [
										{
											className: 'TestClass',
											candidates: [
												{
													candidateName: 'Antonio Zurita',
													candidateEmail: 'candidate@gmail.com',
													_id: '61fbff188d4a924250b51954',
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
			tags: ['classes'],
			summary: 'Delete a class',
			description: 'Allows you to remove a class belonging to the logged in user',
			operationId: 'deleteClasses',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/deleteClasses',
						},
						examples: {
							User: {
								$ref: '#/components/examples/deleteClasses',
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
