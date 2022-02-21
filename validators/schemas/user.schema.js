const validations = require('../validations');
const { Joi } = validations;

const login = Joi.object().keys({ password: validations.password.required(), user: validations.user_name.required() });
const auth_request = Joi.object().keys({ token: validations.jwt.required() });
const id = Joi.object().keys({ id: validations.id.required() });

const user = Joi.object().keys({
	password: validations.password.required(),
	user: validations.user_name.required(),
	email: validations.email.required(),
	name: validations.name.required(),
	active: validations.active,
});

const user_up = Joi.object().keys({
	password: validations.password.required(),
	user: validations.user_name.required(),
	email: validations.email.required(),
	name: validations.name.required(),
	active: validations.active,
});

const reset_password = Joi.object().keys({
	password: validations.password.required(),
	user: validations.user_name.required(),
	secret: validations.secret.required(),
});

module.exports = { reset_password, auth_request, user_up, user, login, id };
