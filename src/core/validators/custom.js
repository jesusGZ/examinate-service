const invalidCharsRegex = /{|}|\(|\)|<|>|\[|\]|\^|"|\?|=|:|\*|&|#/;
const SQLKeywordsRegex = /\b(?:OR|FROM|WHERE|DELETE|DROP|SELECT|UPDATE|INSERT|GRANT|REVOKE|UNION)\b/i;
const JWTRegex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/;
const onlyNumbersRegex = /[^0-9!?]/;

const string = (joi) => ({
	type: 'string',
	base: joi.string(),
	rules: {
		removeSpaces: {
			validate(value) {
				return value.replace(/\s/g, '');
			},
		},
		removeSpacesInBetween: {
			validate(value) {
				const words = value.split(' ');
				const wordsWithoutSpaces = words.filter((word) => word.trim() !== '');
				return wordsWithoutSpaces.join(' ').toString();
			},
		},
		capitalize: {
			validate(value) {
				const words = value.split(' ');
				const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
				return capitalizedWords.join(' ').toString();
			},
		},
		hasInvalidChars: {
			validate(value, helpers) {
				if (invalidCharsRegex.test(value)) return helpers.error('string.caracteresInvalidos');
				return value;
			},
		},
		hasSQLWords: {
			validate(value, helpers) {
				if (SQLKeywordsRegex.test(value)) return helpers.error('string.caracteresInvalidos');
				return value;
			},
		},
		isNotNumber: {
			validate(value, helpers) {
				if (onlyNumbersRegex.test(value)) return helpers.error('string.numeros');
				return value;
			},
		},
		jwt: {
			validate(value, helpers) {
				if (!JWTRegex.test(value)) return helpers.error('string.jwt');
				return value;
			},
		},
	},
});

module.exports = { string };
