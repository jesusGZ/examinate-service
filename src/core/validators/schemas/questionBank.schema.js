const validations = require('../validations');
const { Joi } = validations;

const questionBank = Joi.object().keys({ questionBankName: validations.question_bank_name.required() });
const questionBank_del = Joi.object().keys({ questionBankId: validations.id.required() });

const questionBank_up = Joi.object().keys({
	questionBankName: validations.question_bank_name.required(),
	id: validations.id.required(),
	questions: Joi.array()
		.items(
			Joi.object().keys({
				correctOptionValue: validations.correct_option_value.required(),
				marks: validations.marks.required(),
				value: validations.value.required(),
				options: Joi.array()
					.items(Joi.object().keys({ value: validations.value.required() }))
					.min(1)
					.required(),
			})
		)
		.min(1)
		.required(),
});

module.exports = { questionBank, questionBank_del, questionBank_up };
