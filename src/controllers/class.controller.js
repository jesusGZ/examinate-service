const CLASS_SERVICE = require('../services/class.service');
const logger = require('../utils/logger');

module.exports = class ClassProcess {
	createClass(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const class_service = new CLASS_SERVICE();

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

	getClass(user) {
		return new Promise(async (resolve, reject) => {
			try {
				const class_service = new CLASS_SERVICE();

				const found_element = await class_service.getFoundElements(user);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: found_element.classes, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor.');
			}
		});
	}

	updateClass(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const class_service = new CLASS_SERVICE();

				await class_service.updateClass(data.user, data.updatedClass);

				const found_element = await class_service.getFoundElements(data.user);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: found_element, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor.');
			}
		});
	}

	deleteClass(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const class_service = new CLASS_SERVICE();

				await class_service.deleteClass(data.user, data.classId);

				const found_element = await class_service.getFoundElements(data.user);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: found_element, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor.');
			}
		});
	}
};
