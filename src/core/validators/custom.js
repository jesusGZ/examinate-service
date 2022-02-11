const { spaces_regex } = require('../config/regex');
const { invalid_chars_regex, SQL_keywords_regex, JWT_regex, only_numbers_regex } = require('../config/regex');

const removeSpaces = {
	validate(value) {
		return value.replace(spaces_regex, '');
	},
};

const removeSpacesInBetween = {
	validate(value) {
		const words = value.split(' ');
		const words_without_spaces = words.filter((word) => word.trim() !== '');
		return words_without_spaces.join(' ').toString();
	},
};

const capitalize = {
	validate(value) {
		const words = value.split(' ');
		const capitalized_words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
		return capitalized_words.join(' ').toString();
	},
};

const hasInvalidChars = {
	validate(value, helpers) {
		if (invalid_chars_regex.test(value)) return helpers.error('string.invalidCharacters');
		return value;
	},
};

const hasSQLWords = {
	validate(value, helpers) {
		if (SQL_keywords_regex.test(value)) return helpers.error('string.invalidCharacters');
		return value;
	},
};

const isNotNumber = {
	validate(value, helpers) {
		if (only_numbers_regex.test(value)) return helpers.error('string.numeros');
		return value;
	},
};

const jwt = {
	validate(value, helpers) {
		if (!JWT_regex.test(value)) return helpers.error('string.jwt');
		return value;
	},
};

const string = (joi) => ({
	type: 'string',
	base: joi.string(),
	rules: {
		removeSpaces: removeSpaces,
		removeSpacesInBetween: removeSpacesInBetween,
		capitalize: capitalize,
		hasInvalidChars: hasInvalidChars,
		hasSQLWords: hasSQLWords,
		isNotNumber: isNotNumber,
		jwt: jwt,
	},
});

module.exports = { string };
