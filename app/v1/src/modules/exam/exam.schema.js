const validations = require('../../../../../validators/validations');
const { Joi } = validations;

const examId = Joi.object().keys({ examId: validations.id.required() });
const id = Joi.object().keys({ id: validations.id.required() });

const exam = Joi.object().keys({
	startDateTime: validations.date.required(),
	examName: validations.exam_name.required(),
	endDateTime: validations.date.required(),
	questionBankId: validations.id.required(),
	classId: validations.id.required(),
});

module.exports = { exam, id, examId };
