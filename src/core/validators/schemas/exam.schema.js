const validaciones = require('../validations');

const { Joi } = validaciones;

const exam = Joi.object().keys({
	examName: validaciones.examname.required(),
	startDateTime: validaciones.fecha.required(),
	endDateTime: validaciones.fecha.required(),
	questionBankId: validaciones.id.required(),
	classId: validaciones.id.required(),
});

const id = Joi.object().keys({
	id: validaciones.id.required(),
});

const examId = Joi.object().keys({
	examId: validaciones.id.required(),
});

module.exports = {
	exam,
	id,
	examId,
};
