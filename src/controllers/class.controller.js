const {} = require('../core/config');
const CLASS_SERVICE = require('../services/class.service');
const logger = require('../utils/logger');

module.exports = class ClassProcess {
	createClass(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const class_service = new CLASS_SERVICE();

				await class_service.updateClass(data.username, data.class_name);

				const found_element = await class_service.getFoundElements(data.username);
				if (!found_element) return reject('No se encontro informacion');

				resolve({ status: 'success', data: found_element.classes, message: 'Petición realizada exitosamente.' });
			} catch (error) {
				logger.error(`${error.status} - ${error.message}`);
				reject('Error internodel servidor');
			}
		});
	}
};
