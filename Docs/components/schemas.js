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
	},
};
