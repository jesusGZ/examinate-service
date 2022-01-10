const validaciones = require('../validations');

const { Joi } = validaciones;

const user = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	name: validaciones.name.required(),
	email: validaciones.email.required(),
	active: validaciones.active,
});

const user_up = Joi.object().keys({
	password: validaciones.password.required(),
	name: validaciones.name.required(),
	user: validaciones.username.required(),
	email: validaciones.email.required(),
	active: validaciones.active,
});

const id = Joi.object().keys({
	id: validaciones.id.required(),
});

const auth_request = Joi.object().keys({
	token: validaciones.jwt.required(),
});

const reset_password = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	secret: validaciones.secret.required(),
});

const login = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
});

module.exports = {
	auth_request,
	reset_password,
	user_up,
	user,
	login,
	id,
};
