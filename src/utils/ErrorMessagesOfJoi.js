module.exports = function getErrorMessagesOfJoi(element) {
	const error = element[0]['type'];
	const context = element[0].context;
	const parameter = element[0].context.label;
	let message;

	console.log(error);
	if (error == 'string.dataUri' || error == 'string.uri' || error == 'string.pattern.base') return (message = `El campo ${parameter} debe ser una uri valida`);
	if (error == 'string.min') return (message = `El mínimo de caracteres que puedes incluir en el campo ${parameter} es ${context.limit}`);
	if (error == 'string.max') return (message = `El máximo de caracteres que puedes incluir en el campo ${parameter} es ${context.limit}`);
	if (error == 'number.min') return (message = `El numero mínimo que puedes incluir en el campo ${parameter} es ${context.limit}`);
	if (error == 'number.max') return (message = `El numero máximo que puedes incluir en el campo ${parameter} es ${context.limit}`);
	if (error == 'string.guid' || error == 'string.pattern.name') return (message = `El campo ${parameter} debe ser un UUID valido`);
	if (error == 'number.base' || error == 'string.numbers') return (message = `El campo ${parameter} debe contener solo números`);
	if (error == 'string.length') return (message = `La longitud del campo ${parameter} debe ser de ${context.limit} caracteres`);
	if (error == 'string.empty' || error == 'string.trim') return (message = `El campo ${parameter} no puede estar vació`);
	if (error == 'object.unknown' || error == 'any.unknown') return (message = `El campo ${parameter} no esta permitido`);
	if (error == 'string.invalidCharacters') return (message = `El campo ${parameter} contiene caracteres no válidos`);
	if (error == 'date.format') return (message = `El campo ${parameter} debe tener el formato ${context.format}`);
	if (error == 'string.email') return (message = `El campo ${parameter} debe ser un correo electronico valido`);
	if (error == 'number.integer') return (message = `El campo ${parameter} debe ser un numero entero`);
	if (error == 'string.jwt') return (message = `El campo ${parameter} debe ser un token valido`);
	if (error == 'boolean.base') return (message = `El campo ${parameter} debe ser un boleano`);
	if (error == 'string.base') return (message = `El campo ${parameter} debe ser un string`);
	if (error == 'object.base') return (message = `El campo ${parameter} debe ser un objeto`);
	if (error == 'array.base') return (message = `El campo ${parameter} debe ser un arreglo`);
	if (error == 'any.required') return (message = `El campo ${parameter} es requerido`);

	return (message = 'Por favor verifique la información, si el error persiste contacte a soporte');
};
