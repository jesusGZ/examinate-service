const examinaterModel = require('../models/examinater.model');

module.exports = class ClassService {
	async getFoundElements(user) {
		const data = await examinaterModel.findOne({ user: user }, { classes: 1 });
		return data;
	}

	async getClassById(user, classId) {
		const data = await examinaterModel.findOne({ user: user, 'classes._id': classId }, { classes: 1 });
		return data;
	}

	async getClasses(user, class_name) {
		const data = await examinaterModel.findOne({ user: user, 'classes.className': class_name }, { classes: 1 });
		return data;
	}

	async getClassesDistincId(user, className, id) {
		const data = await examinaterModel.findOne({ user: user, classes: [{ className: className, _id: { $ne: id } }] }, { classes: 1 });
		return data;
	}

	async insertClass(user, class_name) {
		const data = await examinaterModel.findOneAndUpdate({ user: user }, { $addToSet: { classes: { className: class_name } } });
		return data;
	}

	async updateClass(user, updatedClass) {
		const data = await examinaterModel.findOneAndUpdate({ user: user, 'classes._id': updatedClass._id }, { $set: { 'classes.$': updatedClass } });
		return data;
	}

	async deleteClass(user, classId) {
		const data = await examinaterModel.findOneAndUpdate({ user: user }, { $pull: { classes: { _id: classId } } });
		return data;
	}
};
