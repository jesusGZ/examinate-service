const response = require('../../../../helpers/serviceResponse');
const class_service = require('./class.service');
const logger = require('../../../../utils/logger');

async function createClass(req, res, next) {
	try {
		const class_name = req.body.className;
		const user = req.payload.user;

		const class_data = await class_service.getClasses(user, class_name);
		if (class_data) return response.badRequest(res, 'La clase ya se encuentra registrada');

		await class_service.insertClass(user, class_name);

		const found_element = await class_service.getFoundElements(user);

		response.ok(res, found_element.classes);
	} catch (error) {
		logger.errorLogger('Class Module', error.message);
		response.internalServerError(res);
	}
}

async function getClass(req, res, next) {
	try {
		const user = req.payload.user;

		const found_element = await class_service.getFoundElements(user);
		if (!found_element) return response.badRequest(res, 'No se encontro informacion');

		response.ok(res, found_element.classes);
	} catch (error) {
		logger.errorLogger('Class Module', error.message);
		response.internalServerError(res);
	}
}

async function updateClass(req, res, next) {
	try {
		const { id, className, candidates } = req.body;
		const user = req.payload.user;

		const class_data = await class_service.getClassById(user, id);
		if (!class_data) return response.badRequest(res, 'No se encontro informacion');

		const verify_class_name = await class_service.getClasses(user, className);
		if (verify_class_name) {
			verify_class_name.classes.map((item) => {
				if (item.className == className && item._id != id) return response.badRequest(res, 'El nombre de la clase ya se encuentra registrado.');
				return item;
			});
		}

		await class_service.updateClass(user, id, className, candidates);

		const found_element = await class_service.getFoundElements(user);
		if (!found_element) return response.badRequest(res, 'No se encontro informacion');

		response.ok(res, found_element);
	} catch (error) {
		logger.errorLogger('Class Module', error.message);
		response.internalServerError(res);
	}
}

async function deleteClass(req, res, next) {
	try {
		const classId = req.body.classId;
		const user = req.payload.user;

		const class_data = await class_service.getClassById(user, classId);
		if (!class_data) return response.badRequest(res, 'No se encontro informacion');

		await class_service.deleteClass(user, classId);

		const found_element = await class_service.getFoundElements(user);
		if (!found_element) return response.badRequest(res, 'No se encontro informacion');

		response.ok(res, found_element.classes);
	} catch (error) {
		logger.errorLogger('Class Module', error.message);
		response.internalServerError(res);
	}
}

module.exports = { deleteClass, updateClass, getClass, createClass };
