const validaciones = require('../validations');
const { Joi } = validaciones;

const classes = Joi.object().keys({ className: validaciones.classes.required() });
const classes_del = Joi.object().keys({ classId: validaciones.id.required() });

const classes_up = Joi.object().keys({
	className: validaciones.classes.required(),
	id: validaciones.id.required(),
	candidates: Joi.array()
		.items(Joi.object().keys({ candidateEmail: validaciones.candidateEmail.required(), candidateName: validaciones.candidateName.required() }))
		.min(1)
		.required(),
});

module.exports = { classes, classes_up, classes_del };
