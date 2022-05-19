require('dotenv').config();

module.exports = {
	EMAIL: { MAILJET_API_KEY: process.env.MAILJET_API_KEY, MAILJET_API_SECRET: process.env.MAILJET_API_SECRET },
	SWAGGER: { SWAGGER_USER: process.env.SWAGGER_USER, SWAGGER_PASS: process.env.SWAGGER_PASS },
	SERVICE: { PORT: Number(process.env.PORT), LOCAL_PORT: Number(process.env.PORT) },
	MONGO_DB: {
		PORT: Number(process.env.MONGO_PORT),
		DB_NAME: process.env.MONGO_DB_NAME,
		HOST: process.env.MONGO_HOST,
		MONGO_CONFIG: {
			//serverSelectionTimeoutMS: 5000,
			user: process.env.MONGO_USER,
			pass: process.env.MONGO_PASS,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			autoIndex: true,
		},
	},
	MONGO_LOGS_DB: {
		COLLECTION: process.env.MONGO_LOGS_COLLECTION,
		PORT: Number(process.env.MONGO_LOGS_PORT),
		HOST: process.env.MONGO_LOGS_HOST,
		USER: process.env.MONGO_LOGS_USER,
		PASS: process.env.MONGO_LOGS_PASS,
		DB: process.env.MONGO_LOGS_DB,
	},
	SECURITY: {
		JWT_EXPIRATION_USER: process.env.JWT_EXPIRATION_USER,
		SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
		SECRET_KEY: process.env.SECRET_KEY,
		JWT_KEY: process.env.JWT_KEY,
	},
};
