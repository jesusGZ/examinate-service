const validaciones = require('../validations');

const { Joi } = validaciones;

const examId = Joi.object().keys({ examId: validaciones.id.required() });

const id = Joi.object().keys({ id: validaciones.id.required() });

const exam = Joi.object().keys({
	startDateTime: validaciones.fecha.required(),
	examName: validaciones.examname.required(),
	endDateTime: validaciones.fecha.required(),
	questionBankId: validaciones.id.required(),
	classId: validaciones.id.required(),
});

module.exports = { exam, id, examId };
