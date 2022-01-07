const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = async (plainTextPassword) => {
	const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
	return hashedPassword;
};

const compare = async (plainTextPassword, hashedPassword) => {
	const result = await bcrypt.compare(plainTextPassword, hashedPassword);
	return result;
};

module.exports = { hash, compare };
