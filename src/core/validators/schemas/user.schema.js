const validaciones = require('../validations');

const { Joi } = validaciones;

const usuario = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	nombre: validaciones.nombre.required(),
	email: validaciones.email.required(),
	activo: validaciones.activo,
});

const usuario_up = Joi.object().keys({
	password: validaciones.password.required(),
	nombre: validaciones.nombre.required(),
	user: validaciones.username.required(),
	email: validaciones.email.required(),
	activo: validaciones.activo,
});

const id = Joi.object().keys({
	id: validaciones.id.required(),
});

const autenticarPeticion = Joi.object().keys({
	token: validaciones.jwt.required(),
});

const cambiarPassword = Joi.object().keys({
	password: validaciones.password.required(),
	user: validaciones.username.required(),
	secret: validaciones.secret.required(),
});

module.exports = {
	autenticarPeticion,
	cambiarPassword,
	usuario_up,
	usuario,
	id,
};
