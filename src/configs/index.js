require('dotenv').config();

module.exports = {
	EMAIL: { MAILJET_API_KEY: process.env.MAILJET_API_KEY, MAILJET_API_SECRET: process.env.MAILJET_API_SECRET },
	SWAGGER: { SWAGGER_USER: process.env.SWAGGER_USER, SWAGGER_PASS: process.env.SWAGGER_PASS },
	SERVICE: { PORT: process.env.PORT, LOCAL_PORT: process.env.PORT },
	MONGO_DB: {
		MONGO_COLLECTION_LOGS: process.env.MONGO_COLLECTION_LOGS,
		MONGO_DB_NAME: process.env.MONGO_DB_NAME,
		MONGO_DB_LOGS: process.env.MONGO_DB_LOGS,
		MONGO_HOST: process.env.MONGO_HOST,
		MONGO_PORT: process.env.MONGO_PORT,
		MONGO_USER: process.env.MONGO_USER,
		MONGO_PASS: process.env.MONGO_PASS,
	},
	SECURITY: {
		JWT_EXPIRATION_USER: process.env.JWT_EXPIRATION_USER,
		SECRET_KEY: process.env.SECRET_KEY,
		JWT_KEY: process.env.JWT_KEY,
	},
};
