const validaciones = require('../validations');

const { Joi } = validaciones;

const examLive = Joi.object().keys({
	examinerId: validaciones.id.required(),
	examId: validaciones.id.required(),
	candidateId: validaciones.id.required(),
	candidatePassword: validaciones.password.required(),
});

module.exports = {
	examLive,
};
