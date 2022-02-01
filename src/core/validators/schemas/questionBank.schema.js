const validaciones = require('../validations');

const { Joi } = validaciones;

const questionBank = Joi.object().keys({
	questionBankName: validaciones.questionBankName.required(),
});

const questionBank_del = Joi.object().keys({
	questionBankId: validaciones.id.required(),
});

const questionBank_up = Joi.object().keys({
	id: validaciones.id.required(),
	questionBankName: validaciones.questionBankName.required(),
	questions: Joi.array()
		.items(
			Joi.object().keys({
				marks: validaciones.marks.required(),
				value: validaciones.value.required(),
				options: Joi.array()
					.items(Joi.object().keys({ value: validaciones.value.required() }))
					.min(1)
					.required(),
				correctOptionValue: validaciones.correctOptionValue.required(),
			})
		)
		.min(1)
		.required(),
});

module.exports = { questionBank, questionBank_del, questionBank_up };
