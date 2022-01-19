const validaciones = require('../validations');

const { Joi } = validaciones;

const questionBank = Joi.object().keys({
	class: validaciones.classes.required(),
});

module.exports = { questionBank };
