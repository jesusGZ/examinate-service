const jwt = require('jsonwebtoken');

const { SECURITY } = require('../../../../configs');
const bcrypt = require('../../../../utils/bcrypt');
const user_service = require('./user.service');
const logger = require('../../../../utils/logger');
const response = require('../../../../helpers/serviceResponse');

async function createUser(req, res, next) {
	try {
		let { name, email, user, password, active } = req.body;

		const data_user = await user_service.getUser(user);
		if (data_user) return response.error(res, 'El usuario ya esta registrado');

		const data_email = await user_service.getEmail(email);
		if (data_email) return response.error(res, 'El email ya esta registrado');

		const encrypted_password = await bcrypt.hash(password);
		password = encrypted_password;

		const result = await user_service.insertUser({ name, email, user, password, active });

		const item = result.toObject();
		delete item.password;
		delete item.__v;
		delete item.exams;
		delete item.classes;
		delete item.questionBanks;

		response.ok(res, item);
	} catch (error) {
		logger.errorLogger('User Module', error.message);
		response.serverError(res, error);
	}
}

async function getUser(req, res, next) {
	try {
		const { id } = req.headers;

		const data_user = await user_service.getUserById(id);
		if (!data_user) return response.error(res, 'No se encontraron datos de usuario');

		delete data_user.password;

		response.ok(res, data_user);
	} catch (error) {
		logger.errorLogger('User Module', error.message);
		response.serverError(res, error);
	}
}

async function getUsers(req, res, next) {
	try {
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

		response.ok(res, users);
	} catch (error) {
		logger.errorLogger('User Module', error.message);
		response.serverError(res, error);
	}
}

async function updateUser(req, res, next) {
	try {
		let { name, email, user, password, active } = req.body;
		const { id } = req.headers;

		const verify_user = await user_service.getUserById(id);
		if (!verify_user) return response.error(res, 'No se encontraron datos de usuario');

		const data_user = await user_service.getUserDistinctId(user, id);
		if (data_user) return response.error(res, 'El nombre ya esta registrado');

		const data_email = await user_service.getEmailDistinctId(email, id);
		if (data_email) return response.error(res, 'El email ya esta registrado');

		if (password == undefined) {
			const data_password = await user_service.getPasswordById(id);
			password = data_password.password;
		} else {
			const encrypted_password = await bcrypt.hash(password);
			password = encrypted_password;
		}

		await user_service.updateUser({ name, email, user, password, active, id });

		response.ok(res);
	} catch (error) {
		logger.errorLogger('User Module', error.message);
		response.serverError(res, error);
	}
}

async function resetPassword(req, res, next) {
	try {
		const { user, password, secret } = req.body;
		if (secret !== SECURITY.SECRET_KEY) return response.error(res, 'No esta autorizado para realizar esta acción');

		const data_user = await user_service.getUser(user);
		if (!data_user) return response.error(res, 'No se encontraron datos de usuario');

		const new_password = await bcrypt.hash(password);

		await user_service.updateUserPassword(data_user, new_password);
		logger.infoLogger('User Module', `${data_user._id} reset password`);

		response.ok(res);
	} catch (error) {
		logger.errorLogger('User Module', error.message);
		response.serverError(res, error);
	}
}

async function login(req, res, next) {
	try {
		const { user, password } = req.body;

		const user_password = await user_service.getPasswordByUser(user);
		if (!user_password) return response.error(res, 'Credenciales Incorrectas');

		const password_result = await bcrypt.compare(password, user_password.password);
		if (!password_result) return response.error(res, 'Credenciales Incorrectas');

		const data_user = await user_service.getUserById(user_password._id);
		if (!data_user) return response.error(res, 'Credenciales Incorrectas');

		//const payload = { payload: data_user._id.toString() };
		const payload = { id: data_user._id.toString(), user: data_user.user };
		const options = { expiresIn: SECURITY.JWT_EXPIRATION_USER };
		const private_key = SECURITY.JWT_KEY + data_user.password;
		const access_token = await jwt.sign(payload, private_key, options);

		delete data_user.password;
		logger.infoLogger('User Module', data_user);
		data_user.access_token = access_token;

		response.ok(res, data_user);
	} catch (error) {
		logger.errorLogger('User Module', error.message);
		response.serverError(res, error);
	}
}

module.exports = { createUser, getUser, getUsers, updateUser, resetPassword, login };
