module.exports = {
	responses: {
		400: {
			description: 'User error, this is defined as the case.',
			content: {
				'application/json': {
					schema: { example: { success: false, message: 'Wrong parameters.', result: null } },
				},
			},
		},
		401: {
			description: 'Authentication Error.',
			content: {
				'application/json': {
					schema: { example: { success: false, message: 'Not authorized.', result: null } },
				},
			},
		},
		500: {
			description: 'server error.',
			content: {
				'application/json': {
					schema: { example: { success: false, message: 'Internal Server Error.', result: null } },
				},
			},
		},
	},
};
