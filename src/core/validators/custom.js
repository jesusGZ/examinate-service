const invalid_chars_regex = /{|}|\(|\)|<|>|\[|\]|\^|"|\?|=|:|\*|&|#/;
const SQL_keywords_regex = /\b(?:OR|FROM|WHERE|DELETE|DROP|SELECT|UPDATE|INSERT|GRANT|REVOKE|UNION)\b/i;
const JWT_regex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/;
const only_numbers_regex = /[^0-9!?]/;

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
				const words_without_spaces = words.filter((word) => word.trim() !== '');
				return words_without_spaces.join(' ').toString();
			},
		},
		capitalize: {
			validate(value) {
				const words = value.split(' ');
				const capitalized_words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
				return capitalized_words.join(' ').toString();
			},
		},
		hasInvalidChars: {
			validate(value, helpers) {
				if (invalid_chars_regex.test(value)) return helpers.error('string.caracteresInvalidos');
				return value;
			},
		},
		hasSQLWords: {
			validate(value, helpers) {
				if (SQL_keywords_regex.test(value)) return helpers.error('string.caracteresInvalidos');
				return value;
			},
		},
		isNotNumber: {
			validate(value, helpers) {
				if (only_numbers_regex.test(value)) return helpers.error('string.numeros');
				return value;
			},
		},
		jwt: {
			validate(value, helpers) {
				if (!JWT_regex.test(value)) return helpers.error('string.jwt');
				return value;
			},
		},
	},
});

module.exports = { string };
