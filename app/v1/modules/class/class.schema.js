const validations = require('../../../../validators/validations');
const { Joi } = validations;

const classes = Joi.object().keys({ className: validations.classes.required() });
const classes_del = Joi.object().keys({ classId: validations.id.required() });

const classes_up = Joi.object().keys({
	className: validations.classes.required(),
	id: validations.id.required(),
	candidates: Joi.array()
		.items(Joi.object().keys({ candidateEmail: validations.candidate_email.required(), candidateName: validations.candidate_name.required() }))
		.min(1)
		.required(),
});

module.exports = { classes, classes_up, classes_del };
