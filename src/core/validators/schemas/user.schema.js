const validaciones = require('../validations');
const { Joi } = validaciones;

const login = Joi.object().keys({ password: validaciones.password.required(), user: validaciones.username.required() });
const auth_request = Joi.object().keys({ token: validaciones.jwt.required() });
const id = Joi.object().keys({ id: validaciones.id.required() });

const user = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	email: validaciones.email.required(),
	name: validaciones.name.required(),
	active: validaciones.active,
});

const user_up = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	email: validaciones.email.required(),
	name: validaciones.name.required(),
	active: validaciones.active,
});

const reset_password = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	secret: validaciones.secret.required(),
});

module.exports = { reset_password, auth_request, user_up, user, login, id };
