const validaciones = require('../validations');

const { Joi } = validaciones;

const classes = Joi.object().keys({
	class: validaciones.classes.required(),
});

const classes_up = Joi.object().keys({
	class: validaciones.classes.required(),
	updatedClass: validaciones.id.required(),
});

const classes_del = Joi.object().keys({
	classId: validaciones.id.required(),
});

module.exports = { classes, classes_up, classes_del };
