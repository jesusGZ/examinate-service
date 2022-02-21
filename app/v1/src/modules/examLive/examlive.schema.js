const validations = require('../../../../../validators/validations');
const { Joi } = validations;

const examLive = Joi.object().keys({
	candidatePassword: validations.password.required(),
	candidateId: validations.id.required(),
	examinerId: validations.id.required(),
	examId: validations.id.required(),
});

const examLiveResults = Joi.object().keys({
	candidatePassword: validations.password.required(),
	candidateId: validations.id.required(),
	examinerId: validations.id.required(),
	examId: validations.id.required(),
	responses: Joi.array()
		.items(Joi.object().keys({ questionId: validations.id.required(), optionId: validations.id.required() }))
		.min(1)
		.required(),
});

module.exports = { examLive, examLiveResults };
