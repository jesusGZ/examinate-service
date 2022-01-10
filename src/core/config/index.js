require('dotenv').config();

module.exports = {
	SERVICE: {
		PORT: process.env.PORT,
		LOCAL_PORT: process.env.PORT,
	},
	MONGO_DB: {
		MONGO_HOST: process.env.MONGO_HOST,
		MONGO_PORT: process.env.MONGO_PORT,
		MONGO_USER: process.env.MONGO_USER,
		MONGO_PASS: process.env.MONGO_PASS,
		MONGO_DB_NAME: process.env.MONGO_DB_NAME,
	},
	SECURITY: {
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
		KEY: process.env.KEY,
		JWT_EXPIRATION_USER: process.env.JWT_EXPIRATION_USER,
	},
};
