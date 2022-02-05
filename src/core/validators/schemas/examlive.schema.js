const validaciones = require('../validations');

const { Joi } = validaciones;

const examLive = Joi.object().keys({
	examinerId: validaciones.id.required(),
	examId: validaciones.id.required(),
	candidateId: validaciones.id.required(),
	candidatePassword: validaciones.password.required(),
});

const examLiveResults = Joi.object().keys({
	examinerId: validaciones.id.required(),
	examId: validaciones.id.required(),
	candidateId: validaciones.id.required(),
	candidatePassword: validaciones.password.required(),
	responses: Joi.array()
		.items(
			Joi.object().keys({
				questionId: validaciones.id.required(),
				optionId: validaciones.id.required(),
			})
		)
		.min(1)
		.required(),
});

module.exports = { examLive, examLiveResults };
