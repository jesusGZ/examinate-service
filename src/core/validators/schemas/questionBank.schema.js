const validaciones = require('../validations');

const { Joi } = validaciones;

const questionBank = Joi.object().keys({
	questionBankName: validaciones.questionBankName.required(),
});

const questionBank_del = Joi.object().keys({
	questionBankId: validaciones.id.required(),
});

module.exports = { questionBank, questionBank_del };
