const validaciones = require('../validations');

const { Joi } = validaciones;

const classes = Joi.object().keys({
	className: validaciones.classes.required(),
});

const classes_up = Joi.object().keys({
	id: validaciones.id.required(),
	className: validaciones.classes.required(),
	candidates: Joi.array()
		.items(
			Joi.object().keys({
				//candidateId: validaciones.marks.required(),
				candidateName: validaciones.candidateName.required(),
				candidateEmail: validaciones.candidateEmail.required(),
			})
		)
		.min(1)
		.required(),
});

const classes_del = Joi.object().keys({
	classId: validaciones.id.required(),
});

module.exports = { classes, classes_up, classes_del };
