const bcrypt = require('bcrypt');
const { SECURITY } = require('../configs');

const hash = async (plain_text_password) => {
	const hashed_password = await bcrypt.hash(plain_text_password, SECURITY.SALT_ROUNDS);
	return hashed_password;
};

const compare = async (plain_text_password, hashed_password) => {
	const result = await bcrypt.compare(plain_text_password, hashed_password);
	return result;
};

module.exports = { hash, compare };
