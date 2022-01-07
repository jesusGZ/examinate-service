const getValidationErrorMessage = (param) => {
	const error = param[0]['type'];
	const context = param[0].context;
	const parameter = param[0].context.label;
	let message;

	console.log(error);
	switch (error) {
		case 'string.base':
			message = `El campo ${parameter} debe ser un string`;
			break;

		case 'number.base':
			message = `El campo ${parameter} debe contener solo números`;
			break;

		case 'string.dataUri':
		case 'string.uri':
		case 'string.pattern.base':
			message = `El campo ${parameter} debe ser una uri valida`;
			break;

		case 'string.guid':
		case 'string.pattern.name':
			message = `El campo ${parameter} debe ser un UUID valido`;
			break;

		case 'boolean.base':
			message = `El campo ${parameter} debe ser un booleano`;
			break;

		case 'object.base':
			message = `El campo ${parameter} debe ser un objeto`;
			break;

		case 'array.base':
			message = `El campo ${parameter} debe ser un arreglo`;
			break;

		case 'string.email':
			message = `El campo ${parameter} debe ser un correo electronico valido`;
			break;

		case 'string.jwt':
			message = `El campo ${parameter} debe ser un token valido`;
			break;

		case 'string.empty':
			message = `El campo ${parameter} no puede estar vació`;
			break;

		case 'string.trim':
			message = `El campo ${parameter} no puede estar vació`;
			break;

		case 'string.min':
			message = `El mínimo de caracteres que puedes incluir en el campo ${parameter} es ${context.limit}`;
			break;

		case 'string.max':
			message = `El máximo de caracteres que puedes incluir en el campo ${parameter} es ${context.limit}`;
			break;

		case 'number.min':
			message = `El numero mínimo que puedes incluir en el campo ${parameter} es ${context.limit}`;
			break;

		case 'number.max':
			message = `El numero máximo que puedes incluir en el campo ${parameter} es ${context.limit}`;
			break;

		case 'number.integer':
			message = `El campo ${parameter} debe ser un numero entero`;
			break;

		case 'string.length':
			message = `La longitud del campo ${parameter} debe ser de ${context.limit} caracteres`;
			break;

		case 'any.required':
			message = `El campo ${parameter} es requerido`;
			break;

		case 'string.caracteresInvalidos':
			message = `El campo ${parameter} contiene caracteres no válidos`;
			break;

		case 'object.unknown':
			message = `El campo ${parameter} no esta permitido`;
			break;

		case 'any.unknown':
			message = `El campo ${parameter} no esta permitido`;
			break;

		case 'date.format':
			message = `El campo ${parameter} debe tener el formato ${context.format}`;
			break;

		case 'string.numeros':
			message = `El campo ${parameter} debe contener solo números`;
			break;

		default:
			message = 'Por favor verifique la información, si el error persiste contacte a soporte';
			break;
	}

	return message;
};

module.exports = getValidationErrorMessage;
