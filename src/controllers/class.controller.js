const class_service = require('../services/class.service');
const logger = require('../utils/logger');

function createClass(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const class_data = await class_service.getClasses(data.user, data.class_name);
			if (class_data) return reject('La clase ya se encuentra registrada');

			await class_service.insertClass(data.user, data.class_name);

			const found_element = await class_service.getFoundElements(data.user);

			resolve({ status: 'success', data: found_element.classes, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.error(`${error.status} - ${error.message}`);
			reject('Error internodel servidor.');
		}
	});
}

function getClass(user) {
	return new Promise(async (resolve, reject) => {
		try {
			const found_element = await class_service.getFoundElements(user);
			if (!found_element) return reject('No se encontro informacion');

			resolve({ status: 'success', data: found_element.classes, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.error(`${error.status} - ${error.message}`);
			reject('Error internodel servidor.');
		}
	});
}

function updateClass(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const class_data = await class_service.getClassById(data.user, data.id);
			if (!class_data) return reject('No se encontro informacion');

			const verify_class_name = await class_service.getClasses(data.user, data.className);
			if (verify_class_name) {
				verify_class_name.classes.map((item) => {
					if (item.className == data.className && item._id != data.id) return reject('El nombre de la clase ya se encuentra registrado.');
					return item;
				});
			}

			await class_service.updateClass(data.user, data.id, data.className, data.candidates);

			const found_element = await class_service.getFoundElements(data.user);
			if (!found_element) return reject('No se encontro informacion');

			resolve({ status: 'success', data: found_element, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.error(`${error.status} - ${error.message}`);
			reject('Error internodel servidor.');
		}
	});
}

function deleteClass(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const class_data = await class_service.getClassById(data.user, data.classId);
			if (!class_data) return reject('No se encontro informacion');

			await class_service.deleteClass(data.user, data.classId);

			const found_element = await class_service.getFoundElements(data.user);
			if (!found_element) return reject('No se encontro informacion');

			resolve({ status: 'success', data: found_element.classes, message: 'Petición realizada exitosamente.' });
		} catch (error) {
			logger.error(`${error.status} - ${error.message}`);
			reject('Error internodel servidor.');
		}
	});
}

module.exports = { deleteClass, updateClass, getClass, createClass };
