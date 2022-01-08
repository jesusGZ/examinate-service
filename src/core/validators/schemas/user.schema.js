const validaciones = require('../validations');

const { Joi } = validaciones;

const user = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	name: validaciones.nombre.required(),
	email: validaciones.email.required(),
	active: validaciones.activo,
});

const user_up = Joi.object().keys({
	password: validaciones.password.required(),
	name: validaciones.nombre.required(),
	user: validaciones.username.required(),
	email: validaciones.email.required(),
	active: validaciones.activo,
});

const id = Joi.object().keys({
	id: validaciones.id.required(),
});

const autenticarPeticion = Joi.object().keys({
	token: validaciones.jwt.required(),
});

const reset_password = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	secret: validaciones.secret.required(),
});

module.exports = {
	autenticarPeticion,
	reset_password,
	user_up,
	user,
	id,
};
