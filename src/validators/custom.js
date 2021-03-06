const { spaces_regex, invalid_chars_regex, SQL_keywords_regex, JWT_regex, only_numbers_regex } = require('../configs/regex');

const capitalize = {
	validate(value) {
		const words = value.split(' ');
		const capitalized_words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
		return capitalized_words.join(' ').toString();
	},
};

const has_invalid_chars = {
	validate(value, helpers) {
		if (invalid_chars_regex.test(value)) return helpers.error('string.invalidCharacters');
		return value;
	},
};

const has_SQL_words = {
	validate(value, helpers) {
		if (SQL_keywords_regex.test(value)) return helpers.error('string.invalidCharacters');
		return value;
	},
};

const is_not_number = {
	validate(value, helpers) {
		if (only_numbers_regex.test(value)) return helpers.error('string.numbers');
		return value;
	},
};

const remove_spaces_in_between = {
	validate(value) {
		const words = value.split(' ');
		const words_without_spaces = words.filter((word) => word.trim() !== '');
		return words_without_spaces.join(' ').toString();
	},
};

const jwt = {
	validate(value, helpers) {
		if (!JWT_regex.test(value)) return helpers.error('string.jwt');
		return value;
	},
};

const remove_spaces = {
	validate(value) {
		return value.replace(spaces_regex, '');
	},
};

const string = (joi) => ({
	type: 'string',
	base: joi.string(),
	rules: {
		removeSpacesInBetween: remove_spaces_in_between,
		hasInvalidChars: has_invalid_chars,
		removeSpaces: remove_spaces,
		isNotNumber: is_not_number,
		hasSQLWords: has_SQL_words,
		capitalize: capitalize,
		jwt: jwt,
	},
});

module.exports = { string };
