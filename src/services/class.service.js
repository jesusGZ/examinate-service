const examinaterModel = require('../models/examinater.model');

module.exports = class ClassService {
	async getFoundElements(username) {
		const data = await examinaterModel.findOne({ username: username });
		return data;
	}

	async insertClass(username, class_name) {
		const data = await examinaterModel.findOneAndUpdate({ username: username }, { $addToSet: { classes: class_name } });
		return data;
	}

	async updateClass(username, updatedClass) {
		const data = await examinaterModel.findOneAndUpdate({ username: username, 'classes._id': updatedClass._id }, { $set: { 'classes.$': updatedClass } });
		return data;
	}
};
