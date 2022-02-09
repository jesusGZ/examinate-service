const validaciones = require('../validations');
const { Joi } = validaciones;

const examLive = Joi.object().keys({
	candidatePassword: validaciones.password.required(),
	candidateId: validaciones.id.required(),
	examinerId: validaciones.id.required(),
	examId: validaciones.id.required(),
});

const examLiveResults = Joi.object().keys({
	candidatePassword: validaciones.password.required(),
	candidateId: validaciones.id.required(),
	examinerId: validaciones.id.required(),
	examId: validaciones.id.required(),
	responses: Joi.array()
		.items(Joi.object().keys({ questionId: validaciones.id.required(), optionId: validaciones.id.required() }))
		.min(1)
		.required(),
});

module.exports = { examLive, examLiveResults };
