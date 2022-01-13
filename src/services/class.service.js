const examinaterModel = require('../models/examinater.model');

module.exports = class ClassService {
	async getFoundElements(username) {
		const data = await examinaterModel.findOne({ username: username });
		return data;
	}

	async updateClass(username, class_name) {
		const data = await examinaterModel.findOneAndUpdate({ username: username }, { $addToSet: { classes: class_name } });
		return data;
	}
};
