const { SECURITY } = require('../core/config');
const bcrypt = require('../utils/bcrypt');
const USER_SERVICE = require('../services/user.service');

module.exports = class UsuarioProcess {
	crearUsuario(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const user_service = new USER_SERVICE();

				const datos_user = await user_service.getUser(data.user);
				if (datos_user) return reject('El usuario ya esta registrado');

				const datos_email = await user_service.getEmail(data.email);
				if (datos_email) return reject('El email ya esta registrado');

				const password_encriptado = await bcrypt.hash(data.password);
				data.password = password_encriptado;

				const result = await user_service.insertUser(data);

				resolve({ status: 'success', data: result, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				console.error(error);
				reject('Error internodel servidor');
			}
		});
	}

	obtenerUsuario(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const user_service = new USER_SERVICE();

				const datos_usuario = await user_service.getUserById(id);
				if (!datos_usuario) return reject('No se encontraron datos de usuario');

				resolve({ status: 'success', data: datos_usuario, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				console.error(error);
				reject('Error internodel servidor');
			}
		});
	}

	obtenerUsuarios() {
		return new Promise(async (resolve, reject) => {
			try {
				const user_service = new USER_SERVICE();
				const datos_usuarios = await user_service.getAllUsers();

				const users = datos_usuarios.map((item) => {
					item = item.toObject();
					delete item.password;
					delete item.__v;
					return item;
				});

				resolve({ status: 'success', data: users, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				console.error(error);
				reject('Error internodel servidor');
			}
		});
	}

	actualizarUsuario(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const user_service = new USER_SERVICE();

				const datos_usuario = await user_service.getUserById(data.id);
				if (!datos_usuario) return reject('No se encontraron datos de usuario');

				const data_user = await user_service.getUserDistincId(data.user, data.id);
				if (data_user) return reject('El nombre de usuario ya esta registrado');

				const datos_email = await user_service.getEmailDistincId(data.email, data.id);
				if (datos_email) return reject('El email ya esta registrado');

				if (data.password == undefined) {
					const data_password = await user_service.getPasswordById(data.id);
					data.password = data_password.password;
				} else {
					const password_encriptado = await bcrypt.hash(data.password);
					data.password = password_encriptado;
				}

				await user_service.updateUser(data);

				resolve({ status: 'success', data: '', message: 'Petición realizada exitosamente.' });
			} catch (error) {
				console.error(error);
				reject('Error interno del servidor');
			}
		});
	}

	cambiarPassword(data) {
		return new Promise(async (resolve, reject) => {
			try {
				if (data.secret !== SECURITY.SECRET_KEY) return reject('No esta autorizado para realizar esta acción');

				const user_service = new USER_SERVICE();

				const datos_usuario = await user_service.getUser(data.user);
				if (!datos_usuario) return reject('No se encontraron datos de usuario');

				const passwordNueva = await bcrypt.hash(data.password);

				await user_service.updateUserPassword(datos_usuario, passwordNueva);

				resolve({ status: 'success', data: '', message: 'Petición realizada exitosamente.' });
			} catch (error) {
				console.error(error);
				reject('Error interno del servidor');
			}
		});
	}
};
