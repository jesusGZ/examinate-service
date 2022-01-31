const jwt = require('jsonwebtoken');

const { SECURITY } = require('../core/config');
const bcrypt = require('../utils/bcrypt');
const USER_SERVICE = require('../services/user.service');
const logger = require('../utils/logger');

module.exports = class UserProcess {
	createUser(data) {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(data);
				const user_service = new USER_SERVICE();

				const data_user = await user_service.getUser(data.user);
				if (data_user) return reject('El usuario ya esta registrado');

				const data_email = await user_service.getEmail(data.email);
				if (data_email) return reject('El email ya esta registrado');

				const encrypted_password = await bcrypt.hash(data.password);
				data.password = encrypted_password;

				const result = await user_service.insertUser(data);

				const item = result.toObject();
				delete item.password;
				delete item.__v;
				delete item.exams;
				delete item.classes;
				delete item.questionBanks;

				resolve({ status: 'success', data: item, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor.');
			}
		});
	}

	getUser(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const user_service = new USER_SERVICE();

				const data_user = await user_service.getUserById(id);
				if (!data_user) return reject('No se encontraron datos de usuario');

				delete data_user.password;

				resolve({ status: 'success', data: data_user, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error interno del servidor');
			}
		});
	}

	getUsers() {
		return new Promise(async (resolve, reject) => {
			try {
				const user_service = new USER_SERVICE();
				const data_users = await user_service.getAllUsers();

				const users = data_users.map((item) => {
					item = item.toObject();
					delete item.password;
					delete item.__v;
					delete item.active;
					delete item.exams;
					delete item.classes;
					delete item.questionBanks;
					return item;
				});

				resolve({ status: 'success', data: users, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error interno del servidor');
			}
		});
	}

	updateUser(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const user_service = new USER_SERVICE();

				const verify_user = await user_service.getUserById(data.id);
				if (!verify_user) return reject('No se encontraron datos de usuario');

				const data_user = await user_service.getUserDistincId(data.user, data.id);
				if (data_user) return reject('El nombre de usuario ya esta registrado');

				const data_email = await user_service.getEmailDistincId(data.email, data.id);
				if (data_email) return reject('El email ya esta registrado');

				if (data.password == undefined) {
					const data_password = await user_service.getPasswordById(data.id);
					data.password = data_password.password;
				} else {
					const encrypted_password = await bcrypt.hash(data.password);
					data.password = encrypted_password;
				}

				await user_service.updateUser(data);

				resolve({ status: 'success', data: '', message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error interno del servidor');
			}
		});
	}

	resetPassword(data) {
		return new Promise(async (resolve, reject) => {
			try {
				if (data.secret !== SECURITY.SECRET_KEY) return reject('No esta autorizado para realizar esta acción');

				const user_service = new USER_SERVICE();

				const data_user = await user_service.getUser(data.user);
				if (!data_user) return reject('No se encontraron datos de usuario');

				const new_password = await bcrypt.hash(data.password);

				await user_service.updateUserPassword(data_user, new_password);
				logger.info(`${data_user._id} reset password`);

				resolve({ status: 'success', data: '', message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error interno del servidor');
			}
		});
	}

	login(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const user_service = new USER_SERVICE();

				const user_password = await user_service.getPasswordByUser(data.user);
				if (!user_password) return reject('Credenciales Incorrectas');

				const password = await bcrypt.compare(data.password, user_password.password);
				if (!password) return reject('Credenciales Incorrectas');

				const data_user = await user_service.getUserById(user_password._id);
				if (!data_user) return reject('Credenciales Incorrectas');

				//const payload = { payload: data_user._id.toString() };
				const payload = { payload: { id: data_user._id.toString(), user: data_user.user } };
				const options = { expiresIn: SECURITY.JWT_EXPIRATION_USER };
				const private_key = SECURITY.JWT_KEY + data_user.password;
				const access_token = await jwt.sign(payload, private_key, options);

				delete data_user.password;
				data_user.access_token = access_token;

				resolve({ status: 'success', data: data_user, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error interno del servidor');
			}
		});
	}
};
