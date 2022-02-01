const validaciones = require('../validations');

const { Joi } = validaciones;

const questionBank = Joi.object().keys({
	questionBankName: validaciones.questionBankName.required(),
});

module.exports = { questionBank };
