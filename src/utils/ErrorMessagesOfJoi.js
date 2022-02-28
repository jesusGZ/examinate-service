module.exports = function getErrorMessagesOfJoi(element) {
	const parameter = element[0].context.label;
	const context = element[0].context;
	const error = element[0]['type'];
	let message;

	console.log(error);

	if (error == 'string.dataUri' || error == 'string.uri' || error == 'string.pattern.base') return (message = `the field ${parameter} must be a valid uri`);
	if (error == 'string.min') return (message = `The minimum number of characters you can include in the field ${parameter} is ${context.limit}`);
	if (error == 'string.max') return (message = `The maximum number of characters you can include in the field ${parameter} is ${context.limit}`);
	if (error == 'number.min') return (message = `The minimum number you can include in the field ${parameter} is ${context.limit}`);
	if (error == 'number.max') return (message = `The maximum number you can include in the field ${parameter} is ${context.limit}`);
	if (error == 'string.length') return (message = `La longitud dthe field ${parameter} must be from ${context.limit} characters`);
	if (error == 'string.guid' || error == 'string.pattern.name') return (message = `the field ${parameter} must be a valid UUID`);
	if (error == 'number.base' || error == 'string.numbers') return (message = `the field ${parameter} must contain only numbers`);
	if (error == 'object.unknown' || error == 'any.unknown') return (message = `the field ${parameter} it's not allowed`);
	if (error == 'string.empty' || error == 'string.trim') return (message = `the field ${parameter} it cant be empty`);
	if (error == 'string.invalidCharacters') return (message = `the field ${parameter} contains invalid characters`);
	if (error == 'date.format') return (message = `the field ${parameter} must have the format ${context.format}`);
	if (error == 'string.email') return (message = `the field ${parameter} must be a valid email`);
	if (error == 'number.integer') return (message = `the field ${parameter} must be an integer`);
	if (error == 'string.jwt') return (message = `the field ${parameter} must be a valid token`);
	if (error == 'boolean.base') return (message = `the field ${parameter} must be a boolean`);
	if (error == 'object.base') return (message = `the field ${parameter} must be an object`);
	if (error == 'string.base') return (message = `the field ${parameter} must be a string`);
	if (error == 'any.required') return (message = `the field ${parameter} it is required`);
	if (error == 'array.base') return (message = `the field ${parameter} must be a array`);

	return (message = 'Please check the information, if the error persists contact support');
};
